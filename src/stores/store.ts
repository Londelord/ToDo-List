import { create } from "zustand";
import Task from "../Models/Task.ts";

type TaskStore = {
    tasks: Task[];
    filteredTasks: Task[];
    filter: string;
    sortOrder: string;
    isModalVisible: boolean;
    currentTask: Task | null;
    setFilter: (filter: string) => void;
    setSortOrder: (sortOrder: string) => void;
    setModalVisible: (isVisible: boolean) => void;
    setCurrentTask: (task: Task | null) => void;
    setTasks: (tasks: Task[]) => void;
    setFilteredTasks: (filteredTasks: Task[]) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    filteredTasks: [],
    filter: 'all',
    sortOrder: 'dateDesc',
    isModalVisible: false,
    currentTask: null,
    setFilter: (filter) => set({ filter }),
    setSortOrder: (sortOrder) => set({ sortOrder }),
    setModalVisible: (isVisible) => set({ isModalVisible: isVisible }),
    setCurrentTask: (task) => set({ currentTask: task }),
    setTasks: (tasks: Task[]) => set({ tasks: tasks }),
    setFilteredTasks: (filteredTasks) => set({ filteredTasks }),
}));
