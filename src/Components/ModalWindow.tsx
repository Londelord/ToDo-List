import React, {useEffect, useState} from 'react';
import {Modal} from "antd";
import Task from "../Models/Task.ts";
import CreateTaskFields from "./CreateTaskFields.tsx";
import {useTaskStore} from "../stores/store.ts";

interface Props {
    handleEditTask: (task: Task) => void;
}

const ModalWindow = ({
                         handleEditTask,
                     }: Props) => {


    const [currentInputValue, setCurrentInputValue] = useState("");
    const [currentDescriptionValue, setCurrentDescriptionValue] = useState("");

    const isModalVisible = useTaskStore(state => state.isModalVisible);
    const setModalVisible = useTaskStore(state => state.setModalVisible);

    const currentTask = useTaskStore((state) => state.currentTask);
    const setCurrentTask = useTaskStore((state) => state.setCurrentTask);

    useEffect(() => {
        if (currentTask === null) return;

        setCurrentInputValue(currentTask.attributes.title);
        setCurrentDescriptionValue(currentTask.attributes.description);
    }, [currentTask]);

    const onModalOk = () =>
    {
        const newTask = currentTask as Task;
        newTask.attributes.title = currentInputValue;
        newTask.attributes.description = currentDescriptionValue;
        handleEditTask(newTask);
        setCurrentTask(null);
        setModalVisible(false);
    }

    return (
        <Modal
            title="Редактировать задачу"
            open={isModalVisible}
            onOk={onModalOk}
            onCancel={() => {
                setCurrentTask(null);
                setModalVisible(false);
            }}
        >
            <CreateTaskFields
                inputTitleValue={currentInputValue}
                setInputTitleValue={setCurrentInputValue}
                inputDescriptionValue={currentDescriptionValue}
                setInputDescriptionValue={setCurrentDescriptionValue}
                onPressEnter={onModalOk}/>
        </Modal>
    );
};

export default ModalWindow;