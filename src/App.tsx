import React, {useEffect, useState} from 'react';
import {Button, notification} from 'antd';
import styled from 'styled-components';
import TaskList from "./Components/TaskList.tsx";
import CreateTaskFields from "./Components/CreateTaskFields.tsx";
import Filter from "./Components/Filter.tsx";
import Sorter from "./Components/Sorter.tsx";
import Task from "./Models/Task.ts";
import Api from "./Api.ts";
import api from "./Api.ts";
import Status from "./Models/Status.ts";
import CreateTaskRequest from "./Contracts/CreateTaskRequest.ts";
import UpdateTaskRequest from "./Contracts/UpdateTaskRequest.ts";
import ModalWindow from "./Components/ModalWindow.tsx";
import {useTaskStore} from "./stores/store.ts";


const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
`;

const Title = styled.h1`
    margin-bottom: 20px;
    font-family: "Pacifico", serif;
`;

const App = () => {

    const notifyPlacement = "bottomRight";
    const [notify, contextHolder] = notification.useNotification();

    const [inputTitleValue, setInputTitleValue] = useState("");
    const [inputDescriptionValue, setInputDescriptionValue] = useState("");
    const filter = useTaskStore(state => state.filter);
    const setFilteredTasks = useTaskStore(state => state.setFilteredTasks);
    const tasks = useTaskStore((state) => state.tasks);
    const setTasks = useTaskStore((state) => state.setTasks);
    const currentTask = useTaskStore((state) => state.currentTask);
    const sortOrder = useTaskStore((state) => state.sortOrder);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksFromServer = await Api.getTasks();
                setTasks(tasksFromServer);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTasks();
    }, [setTasks]);

    const handleAddTask = async () => {
        if (inputTitleValue.trim() === "") {
            return
        }

        try {
            const request: CreateTaskRequest = {
                status: Task.getStringStatus(Status.Incomplete),
                title: inputTitleValue.trim(),
                description: inputDescriptionValue.trim()
            };

            const newTask = await api.createTask(request);

            setTasks([...tasks, newTask]);

        } catch (error) {
            console.error(error);
            notify["error"]({
                message: 'Ошибка',
                description: 'Не удалось создать задачу.',
                placement: notifyPlacement,
            });
        }

        notify["success"]({
            message: 'Успех',
            description: 'Задача успешно создана',
            placement: notifyPlacement
        });
        setInputTitleValue("");
        setInputDescriptionValue("");
    }

    const handleEditTask = async (changedTask: Task) => {
        const prevTasks = [...tasks];

        const updatedTasks = tasks.map(task =>
            task.id === changedTask.id
                ? {...task, attributes: {...changedTask.attributes}}
                : task
        );

        setTasks(updatedTasks);

        const updatedTask = updatedTasks.find(task => task.id === changedTask.id);
        if (!updatedTask) return;

        try {
            const newTask: UpdateTaskRequest = {
                id: updatedTask.id,
                createTaskRequest: {
                    status: Task.getStringStatus(updatedTask.attributes.status),
                    title: updatedTask.attributes.title,
                    description: updatedTask.attributes.description
                }
            };

            await api.updateTask(newTask);
        } catch (error) {
            console.error("Ошибка при обновлении задачи:", error);

            setTasks(prevTasks);

            notify["error"]({
                message: "Ошибка",
                description: "Не удалось обновить задачу",
                placement: notifyPlacement,
            });
            return;
        }

        notify["success"]({
            message: "Успех",
            description: "Задача успешно обновлена",
            placement: notifyPlacement,
        });
    };

    const handleDeleteTask = async (id: number) => {
        const prevTasks = [...tasks];

        setTasks([...tasks].filter((task) => task.id !== id));

        try {
            await api.deleteTask(id);
        } catch (error) {
            console.log(error);
            setTasks(prevTasks);

            notify.error({
                message: 'Ошибка',
                description: 'Не удалось удалить задачу.',
                placement: 'bottomRight',
            });
            return;
        }

        notify.success({
            message: 'Успех',
            description: 'Задача успешно удалена',
            placement: 'bottomRight',
        });
    }

    const handleTaskUpdateStatus = async (id: number, toggleStatusFunction: (status: Status) => Status) => {
        const prevTasks = [...tasks];

        const updatedTasks = tasks.map(task =>
            task.id === id
                ? {
                    ...task,
                    attributes: {
                        ...task.attributes,
                        status: toggleStatusFunction(task.attributes.status)
                    }
                }
                : task
        );

        setTasks(updatedTasks);

        const updatedTask = updatedTasks.find(task => task.id === id);
        if (!updatedTask) return;

        try {
            const newTask: UpdateTaskRequest = {
                id: id,
                createTaskRequest: {
                    status: Task.getStringStatus(updatedTask.attributes.status),
                    title: updatedTask.attributes.title,
                    description: updatedTask.attributes.description
                }
            };

            await api.updateTask(newTask);
        } catch (error) {
            console.error("Ошибка при обновлении задачи:", error);

            setTasks(prevTasks);

            notify["error"]({
                message: "Ошибка",
                description: "Не удалось обновить задачу. Попробуйте позже.",
                placement: notifyPlacement,
            });
        }
    };

    const handleCompleteTask = (id: number) => handleTaskUpdateStatus(id, toggleCompleteStatus);
    const handleFavoriteTask = (id: number) => handleTaskUpdateStatus(id, toggleFavoriteStatus);

    const toggleCompleteStatus = (status: Status) => {
        switch (status) {
            case Status.Incomplete:
                return Status.Completed;
            case Status.FavoriteIncomplete:
                return Status.FavoriteCompleted;
            case Status.Completed:
                return Status.Incomplete;
            case Status.FavoriteCompleted:
                return Status.FavoriteIncomplete;
            default:
                return status;
        }
    };

    const toggleFavoriteStatus = (status: Status) => {
        switch (status) {
            case Status.Incomplete:
                return Status.FavoriteIncomplete;
            case Status.FavoriteIncomplete:
                return Status.Incomplete;
            case Status.Completed:
                return Status.FavoriteCompleted;
            case Status.FavoriteCompleted:
                return Status.Completed;
            default:
                return status;
        }
    };


    useEffect(() => {
        let newTaskArray;
        switch (filter) {
            case "all":
                newTaskArray = tasks;
                break;
            case "completed":
                newTaskArray = tasks.filter(task => task.attributes.status === Status.Completed
                    || task.attributes.status === Status.FavoriteCompleted);
                break
            case "incomplete":
                newTaskArray = tasks.filter(task => task.attributes.status === Status.Incomplete
                    || task.attributes.status === Status.FavoriteIncomplete);
                break;
            case "favorite":
                newTaskArray = tasks.filter(task => task.attributes.status === Status.FavoriteCompleted
                    || task.attributes.status === Status.FavoriteIncomplete);
                break;
            default:
                newTaskArray = tasks;
                break;
        }

        switch (sortOrder) {
            default:
            case "dateDesc":
                newTaskArray = [...newTaskArray].sort((a, b) =>
                    b.attributes.updatedAt.getTime() - a.attributes.updatedAt.getTime());
                break;
            case "dateAsc":
                newTaskArray = [...newTaskArray].sort((a, b) =>
                    a.attributes.updatedAt.getTime() - b.attributes.updatedAt.getTime());
                break;
            case "nameDesc":
                newTaskArray = [...newTaskArray].sort((a, b) =>
                    b.attributes.title.localeCompare(a.attributes.title));
                break;
            case "nameAsc":
                newTaskArray = [...newTaskArray].sort((a, b) =>
                    a.attributes.title.localeCompare(b.attributes.title));
                break;
        }

        setFilteredTasks(newTaskArray);

    }, [filter, setFilteredTasks, sortOrder, tasks])


    return (
        <>
            {contextHolder}
            <Container>
                <Title>ToDo List</Title>
                <CreateTaskFields inputTitleValue={inputTitleValue}
                                  setInputTitleValue={setInputTitleValue}
                                  inputDescriptionValue={inputDescriptionValue}
                                  setInputDescriptionValue={setInputDescriptionValue}
                                  onPressEnter={handleAddTask}
                />
                <Button type="primary" onClick={handleAddTask} disabled={inputTitleValue.trim() === ""}>
                    Добавить
                </Button>
                <Filter/>
                <Sorter/>
                <TaskList
                    onDelete={handleDeleteTask}
                    onComplete={handleCompleteTask}
                    onFavorite={handleFavoriteTask}
                />
            </Container>
            {currentTask && (
                <ModalWindow handleEditTask={handleEditTask}/>
            )}
        </>
    );
};

export default App;
