import React from 'react';
import {Select} from "antd";
import {useTaskStore} from "../stores/store.ts";

const {Option} = Select;

const Sorter = () => {
    const sortOrder = useTaskStore(state => state.sortOrder);
    const setSortOrder = useTaskStore(state => state.setSortOrder);

    return (
        <>
            <Select
                value={sortOrder}
                style={{width: 200, marginLeft: 10}}
                onChange={(value) => setSortOrder(value)}
            >
                <Option value="dateDesc">Сначала новые</Option>
                <Option value="dateAsc">Сначала старые</Option>
                <Option value="nameAsc">По возрастанию имени</Option>
                <Option value="nameDesc">По убыванию имени</Option>
            </Select>
        </>
    );
};

export default Sorter;