import { Button, Card, Form, Input, Modal, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Game } from "@/types/entity"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom"
import gameService from "@/api/services/gameService";
import { useState } from "react";


export default function GameListPage() {
    const navigate = useNavigate();
    const client = useQueryClient();
    const [open, setOpen] = useState(false);
    
    const { mutate } = useMutation({
        mutationFn: gameService.deleteGame,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['gameList'] });
        }
    })

    const navigateToGame = (game: Game) => {
        window.currentGame = game;
        navigate(`/game-creation/${game.id}/card`);
    }

    const deleteGame = (record: Game) => {
        mutate(record.id);
    }

    const { data } = useQuery({
        queryKey: ['gameList'],
        queryFn: gameService.getGameList,
    });

    const columns: ColumnsType<Game> = [
        {
            title: '游戏名称',
            dataIndex: 'name',
            render: (text, record) => <a onClick={() => navigateToGame(record)}>{text}</a>,
        },
        { title: '游戏状态', dataIndex: 'status' },
        { title: '更新时间', dataIndex: 'updateTime' },
        {
            title: '操作',
            key: 'operation',
            render: (_, record) => (
                <Button onClick={() => deleteGame(record)}>删除</Button>
            ),
        },
        
    ]

    const onClick = () => {
        setOpen(true);
    }

    return (
        <Card
            title="游戏列表"
            extra={
                <Button onClick={onClick}>
                    新建游戏
                </Button>
            }
        >
            <Table
                rowKey="id"
                size="small"
                columns={columns}
                dataSource={data}
                scroll={{ x: 'max-content' }}
                pagination={false}
            />
            <GameCreateModal open={open} setOpen={setOpen} />
        </Card>
    )
}

type ModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmited?: (open: boolean) => void;
}

const GameCreateModal = ({open, setOpen}: ModalProps) => {
    const client = useQueryClient();
    const [form] = Form.useForm();

    const { mutate } = useMutation({
        mutationFn: gameService.createGame,
        onSuccess: () => {
            setOpen(false);
            client.invalidateQueries({ queryKey: ['gameList'] });
        }
    })
   
    const handleOk = () => {
        mutate(form.getFieldsValue());
    }
    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Modal title="新建游戏" open={open} onOk={handleOk} onCancel={handleCancel} okText="确定" cancelText="取消">
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
            >
                <Form.Item<Game> label="游戏名称" name="name" required>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}