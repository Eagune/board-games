import { Button, Card, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Game } from "@/types/entity"

export default function GameListPage() {

    const columns: ColumnsType<Game> = [
        { title: '游戏名称', dataIndex: 'name' },
        { title: '游戏状态', dataIndex: 'status' },
        { title: '更新时间', dataIndex: 'updateTime' },
        { title: '操作', key: 'operation' },
    ]

    return (
        <Card
            title="游戏列表"
            extra={
                <Button>
                    新建游戏
                </Button>
            }
        >
            <Table
                rowKey="id"
                size="small"
                columns={columns}
                scroll={{ x: 'max-content' }}
                pagination={false}
            />
        </Card>
    )
}