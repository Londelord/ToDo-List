import React from 'react';
import { List } from 'antd';
import Task from '../Models/Task';
import Status from '../Models/Status';
import styled from 'styled-components';
import TaskActions from "./TaskActions.tsx";
import {useTaskStore} from "../stores/store.ts";

const NoteTitle = styled.span<{ completed: boolean }>`
    cursor: pointer;
    text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
    color: ${(props) => (props.completed ? "lightgray" : "inherit")};

    &:hover {
        text-decoration: underline;
    }
`;

interface Props {
    task: Task;
    onComplete: (id: number) => void;
    onFavorite: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskItem = ({ task, onComplete, onFavorite, onDelete } : Props) => {

    const setCurrentTask = useTaskStore((state) => state.setCurrentTask);
    const setModalVisible = useTaskStore((state) => state.setModalVisible);

    return (
        <List.Item
            actions={[
                <TaskActions task={task} onComplete={onComplete} onFavorite={onFavorite} onDelete={onDelete} />
            ]}
        >
            <NoteTitle
                completed={task.attributes.status === Status.Completed
                    || task.attributes.status === Status.FavoriteCompleted}
                onClick={() => {
                    setCurrentTask(task);
                    setModalVisible(true);
                }}
            >
                {task.attributes.title}
            </NoteTitle>
        </List.Item>
    );
};

export default TaskItem;
