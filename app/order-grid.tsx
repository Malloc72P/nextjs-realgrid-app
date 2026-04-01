'use client';

import { useEffect, useRef } from 'react';
import { SortDirection, type GridView, type LocalDataProvider, type ValueType } from 'realgrid';
import { createOrderAction } from '@/server/action/create-order-action';
import { updateOrderAction } from '@/server/action/update-order-action';
import { deleteOrderAction } from '@/server/action/delete-order-action';
import { Order } from './generated/prisma/browser';
import 'realgrid/dist/realgrid-style.css';

export interface OrderGridProps {
    orders: Order[];
}

export function OrderGrid({ orders }: OrderGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<GridView | null>(null);
    const providerRef = useRef<LocalDataProvider | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let grid: GridView;
        let ds: LocalDataProvider;

        (async () => {
            const RealGrid = await import('realgrid');

            ds = new RealGrid.LocalDataProvider(true);
            grid = new RealGrid.GridView(containerRef.current!);

            // 필드 정의 (데이터 구조)
            ds.setFields([
                { fieldName: 'id', dataType: 'number' as ValueType },
                { fieldName: 'price', dataType: 'number' as ValueType },
                { fieldName: 'qty', dataType: 'number' as ValueType },
                { fieldName: 'deleteBtn', dataType: 'text' as ValueType },
            ]);

            // 컬럼 정의 (화면 표시)
            grid.setColumns([
                { name: 'id', fieldName: 'id', header: { text: 'ID' }, editable: false, width: 80, sortable: true },
                { name: 'price', fieldName: 'price', header: { text: 'Price' }, editable: true },
                { name: 'qty', fieldName: 'qty', header: { text: 'Qty' }, editable: true },
                {
                    name: 'deleteBtn',
                    fieldName: 'deleteBtn',
                    header: { text: '' },
                    renderer: { type: 'button' },
                    width: 100,
                    editable: false,
                    sortable: false,
                },
            ]);

            grid.setDataSource(ds);
            ds.setRows(orders.map(o => ({ id: o.id, price: o.price, qty: o.qty, deleteBtn: 'Delete' })));

            // 다른 행으로 이동할 때 편집 커밋
            grid.editOptions.commitWhenLeave = true;

            // 셀 편집 완료 → 서버 업데이트 (낙관적 업데이트)
            grid.onEditCommit = (_grid, index, oldValue, newValue) => {
                const { dataRow, fieldName } = index;
                if (dataRow === undefined || !fieldName || fieldName === 'id') return true;

                const id = ds.getValue(dataRow, 'id') as number;

                updateOrderAction({ id, [fieldName]: Number(newValue) }).catch(() => {
                    // 실패 시 이전 값으로 복원
                    ds.setValue(dataRow, fieldName, oldValue);
                });

                return true;
            };

            // 삭제 버튼 클릭 → 서버 삭제 (낙관적 업데이트)
            grid.onCellItemClicked = (_grid, index) => {
                const { dataRow, fieldName } = index;
                if (fieldName !== 'deleteBtn' || dataRow === undefined) return true;

                const rowData = ds.getJsonRow(dataRow) as Order;
                ds.removeRow(dataRow);

                deleteOrderAction(rowData.id).catch(() => {
                    // 실패 시 행 복원
                    ds.insertRow(dataRow, rowData);
                });

                return true;
            };

            grid.orderBy('id', SortDirection.ASCENDING);

            gridRef.current = grid;
            providerRef.current = ds;
        })();

        return () => {
            gridRef.current?.destroy();
            gridRef.current = null;
            providerRef.current = null;
        };
    }, []);

    // 행 추가 (낙관적 업데이트)
    async function handleCreate() {
        const ds = providerRef.current;
        if (!ds) return;

        const tempId = -Date.now();
        const tempDataRow = ds.addRow({ id: tempId, price: 0, qty: 0, deleteBtn: 'Delete' });

        try {
            const created = await createOrderAction({ price: 0, qty: 0 });
            // 임시 ID를 서버에서 발급된 실제 ID로 교체
            ds.setValue(tempDataRow, 'id', created.id);
        } catch {
            // 실패 시 임시 행 제거
            ds.removeRow(tempDataRow);
        }
    }

    return (
        <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column' }}>
            <div ref={containerRef} style={{ height: 400, width: '100%' }} />
            <button
                className='block w-full text-left py-2 px-3 border border-[#babfc7] border-t-0 bg-white cursor-pointer text-[#6b7280]'
                onClick={handleCreate}
            >
                New Row +
            </button>
        </div>
    );
}
