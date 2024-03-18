import cardService from "@/api/services/cardService";
import { useGameInfo } from "@/store";
import { GameCard } from "@/types/entity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Input, Modal, Table, Upload } from "antd"
import { ColumnsType } from "antd/es/table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardPage() {
    const navigate = useNavigate();
    const client = useQueryClient();
    const { id } = useGameInfo();
    const [open, setOpen] = useState(false);

    const { mutate } = useMutation({
        mutationFn: cardService.deleteGameCard,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['cardList'] });
        }
    })

    const { data } = useQuery({
        queryKey: ['cardList', id],
        queryFn: cardService.getCardList,
    });

    const deleteGameCard = (record: GameCard) => {
        mutate(record.id);
    }

    const navigateToGameCard = (card: GameCard) => {
        navigate(`/game-creation/${id}/card/${card.id}`);
    }

    const columns: ColumnsType<GameCard> = [
        {
            title: '卡牌类型',
            dataIndex: 'name',
            render: (text, record) => <a onClick={() => navigateToGameCard(record)}>{text}</a>,
        },
        { title: '卡牌数量', dataIndex: 'number' },
        {
            title: '操作',
            key: 'operation',
            render: (_, record) => (
                <Button onClick={() => deleteGameCard(record)}>删除</Button>
            ),
        },
    ]

    const onClick = () => {
        setOpen(true);
    }

    return (
        <Card
            title="卡牌定义"
            extra={
                <Button onClick={onClick}>
                    新建卡牌
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
            <GameCardCreateModal open={open} setOpen={setOpen} />
        </Card>
    )
}

type ModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmited?: (open: boolean) => void;
}

const GameCardCreateModal = ({open, setOpen}: ModalProps) => {
    const { id } = useGameInfo();
    const client = useQueryClient();
    const [form] = Form.useForm();

    const { mutate } = useMutation({
        mutationFn: cardService.createGameCard,
        onSuccess: () => {
            setOpen(false);
            client.invalidateQueries({ queryKey: ['cardList', id] });
        }
    })
   
    const handleOk = () => {
        form.validateFields().then(() => {
            // 验证通过，提交表单
            const formValue = form.getFieldsValue()
            mutate({
                gameId: id,
                ...formValue,
                frontImage: formValue['frontImage'].file.response.id,
                backImage: formValue['backImage'].file.response.id,
            });
        });
    }
    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <Modal title="新建卡牌" open={open} onOk={handleOk} onCancel={handleCancel} okText="确定" cancelText="取消">
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
            >
                <Form.Item<GameCard> label="卡牌类型" name="name" required>
                    <Input />
                </Form.Item>
                <Form.Item label="卡面" name="frontImage" required>
                    <Upload name='image' action="http://127.0.0.1:3000/files" listType="picture-card" maxCount={1}>
                        <button type="button">上传</button>
                    </Upload>
                </Form.Item>
                <Form.Item label="卡背" name="backImage" required>
                    <Upload name='image' action="http://127.0.0.1:3000/files" listType="picture-card" maxCount={1}>
                        <button type="button">上传</button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}