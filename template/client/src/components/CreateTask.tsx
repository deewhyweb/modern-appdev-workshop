import { useMutation } from '@apollo/react-hooks';
import { createOptimisticResponse, CacheOperation, getUpdateFunction } from 'offix-client';
import React from 'react';
import { AutoFields, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { TaskSchema } from '../graphql/GraphQLBridge';
import { TaskMutation } from '../graphql/mutations/TaskMutation';
import { TaskQuery } from '../graphql/queries/Tasks';

export const CreateTask: React.FC = () => {
    const [createTaskMutation, { data }] = useMutation(TaskMutation, {
        context: { returnType: "Task" }
    });

    return (
        <AutoForm schema={TaskSchema} onSubmit={(doc: any) =>
            createTaskMutation({
                variables: doc,
                context: { returnType: "Task" },
                optimisticResponse: createOptimisticResponse({
                    mutation: TaskMutation,
                    variables: doc,
                    operationType: CacheOperation.ADD,
                    returnType: "Task"
                }),
                update: getUpdateFunction({
                    mutationName: 'createTask',
                    updateQuery: TaskQuery
                })
            }).catch((error) => {
                if (error.networkError && error.networkError.offline) {
                    console.log("Change is offline")
                }
            })} >
            <AutoFields />
            <ErrorsField />
            <SubmitField />
        </AutoForm>
    );
}