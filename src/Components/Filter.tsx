import React from 'react';
import {Select} from "antd";
import {useTaskStore} from "../stores/store.ts";

const {Option} = Select;

const Filter = () => {
    const filter = useTaskStore(state => state.filter);
    const setFilter = useTaskStore(state => state.setFilter);

    return (
        <>
            <Select
                value={filter}
                style={{width: 200, marginLeft: 10}}
                onChange={(value) => setFilter(value)}
            >
                <Option value="all">Все</Option>
                <Option value="completed">Выполненные</Option>
                <Option value="incomplete">Не выполненные</Option>
                <Option value="favorite">Избранное</Option>
            </Select>
        </>
    );
};

export default Filter;