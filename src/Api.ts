import axios from "axios";
import Task from "./Models/Task.ts";
import CreateTaskRequest from "./Contracts/CreateTaskRequest.ts";
import UpdateTaskRequest from "./Contracts/UpdateTaskRequest.ts";

const route = "https://cms.laurence.host/api";

class Api {
    static getTasks = async (): Promise<Task[]> => {
        const response = await axios.get(route + `/tasks`);
        return response.data.data.map(Task.fromApi);
    };

    static createTask = async (request : CreateTaskRequest): Promise<Task> => {;
        const response = await axios.post(route + `/tasks`, {data: request});
        return Task.fromApi(response.data.data);
    }

    static deleteTask = async (id: number): Promise<void> => {
        await axios.delete(route + `/tasks/${id}`);
    }

    static updateTask = async (request: UpdateTaskRequest): Promise<Task> => {
        const response = await axios.put(route + `/tasks/${request.id}`, {data: request.createTaskRequest});
        return Task.fromApi(response.data.data);
    }
}

export default Api;