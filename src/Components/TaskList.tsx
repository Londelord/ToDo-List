import React from 'react';
import styled from "styled-components";
import {List} from "antd";
import Task from "../Models/Task.ts";
import TaskItem from "./TaskItem.tsx";
import {useTaskStore} from "../stores/store.ts";

interface Props {
    onComplete: (id: number) => void;
    onFavorite: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskContainer = styled(List)`
    margin-top: 20px;
`;


const TaskList = ({onComplete, onFavorite, onDelete}: Props) => {

    const filteredTasks = useTaskStore(state => state.filteredTasks);

    return (
        <TaskContainer dataSource={filteredTasks}
                       renderItem={(task) => (
                           <TaskItem
                               task={task as Task}
                               onComplete={onComplete}
                               onFavorite={onFavorite}
                               onDelete={onDelete}
                           />

                       )}
        />
    );
};

export default TaskList;