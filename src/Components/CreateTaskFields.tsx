import React from 'react';
import styled from "styled-components";
import {Input} from "antd";

const TitleInput = styled(Input)`
    margin-bottom: 4px;
`;

const {TextArea} = Input;

const DescriptionInput = styled(TextArea)`
    margin-bottom: 20px;
    max-height: 300px;
`;

interface Props {
    inputTitleValue: string;
    setInputTitleValue: (value: string) => void;
    inputDescriptionValue: string;
    setInputDescriptionValue: (description: string) => void;
    onPressEnter: () => void;
}

const CreateTaskFields = ({
                              inputTitleValue,
                              inputDescriptionValue,
                              setInputTitleValue,
                              setInputDescriptionValue,
                              onPressEnter
                          }: Props) => {


    return (
        <>
            <TitleInput
                showCount
                maxLength={100}
                value={inputTitleValue}
                onChange={(e) => setInputTitleValue(e.target.value)}
                placeholder="Введите заголовок задачи"
                onPressEnter={onPressEnter}
            />
            <DescriptionInput
                showCount
                maxLength={5000}
                rows={4}
                value={inputDescriptionValue}
                onChange={(e) => setInputDescriptionValue(e.target.value)}
                placeholder="Введите описание задачи"
            />
        </>
    );
};

export default CreateTaskFields;