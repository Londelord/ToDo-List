import React from 'react';
import { Checkbox, Button } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import Task from '../Models/Task';
import Status from '../Models/Status';
import {useTaskStore} from "../stores/store.ts";

interface Props {
    task: Task;
    onComplete: (id: number) => void;
    onFavorite: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskActions = ({ task, onComplete, onFavorite, onDelete } : Props) => {
    return (
        <>
            <Checkbox
                checked={task.attributes.status === Status.Completed || task.attributes.status === Status.FavoriteCompleted}
                onChange={() => onComplete(task.id)}
            />
            <Button type="link" onClick={() => onDelete(task.id)}>Удалить</Button>
            <span onClick={() => onFavorite(task.id)} style={{ cursor: "pointer" }}>
                {(task.attributes.status === Status.FavoriteIncomplete || task.attributes.status === Status.FavoriteCompleted) ? (
                    <StarFilled style={{ color: "gold", fontSize: 20 }} />
                ) : (
                    <StarOutlined style={{ color: "gray", fontSize: 20 }} />
                )}
            </span>
        </>
    );
};

export default TaskActions;
