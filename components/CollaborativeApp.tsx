"use client"
import {useMutation, useStorage, useUpdateMyPresence } from '@liveblocks/react'
import { Input } from "@/components/ui/input"

import React, { useState } from 'react'
import Whoistyping from './Whoistyping'
import SomeoneisTyping from './SomeoneisTyping'
import { LiveObject } from '@liveblocks/client'
const CollaborativeApp = () => {
    //draft 
    const[draft , setDraft] = useState("");
    const updateMyPresence = useUpdateMyPresence();
    const todos = useStorage((root) => root.todos);
    
    const addTodo = useMutation(({storage} , text)=>{
        storage.get("todos").push(new LiveObject({ text }));
    },[])
    const toggleTodo = useMutation(({ storage }, index) => {
        const todo = storage.get("todos").get(index);
        todo?.set("checked", !todo.get("checked"));
      }, []);

    const deleteTodo = useMutation(({storage} , index)=>{
        storage.get("todos").delete(index);
    },[])

  return (
    <div className="container">
      <h1 className='text-xl font-semibold text-center pb-4'>Collaborative Todo App</h1>
      <Whoistyping/>
      
      <Input 
      placeholder='What needs to be done? ' 
      className='box-border p-2 w-full bg-white shadow-sm rounded-lg text-black border-0 text-base appearance-none my-2'
      value={draft}

      onChange={(e)=>{
        setDraft(e.target.value)
        updateMyPresence({ isTyping: true });
      }}
      onKeyDown={(e)=>{
        if(draft && e.key === "Enter"){
            updateMyPresence({ isTyping: false });
            addTodo(draft);
            setDraft("");
        }
      }}
      onBlur={() => updateMyPresence({ isTyping: false })}
      />
      <SomeoneisTyping/>
      {todos && todos.map((todo, index) => {
        return (
          <div key={index} className="todo_container">
            <div className="todo" onClick={() => toggleTodo(index)}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: todo.checked ? "line-through" : undefined,
                }}
              >
                {todo.text}
              </span>
            </div>
            <button className="delete_button" onClick={() => deleteTodo(index)}>
              ✕
            </button>
          </div>
        );
      })}
    </div>
  )
}

export default CollaborativeApp