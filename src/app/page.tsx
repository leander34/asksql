/* eslint-disable @typescript-eslint/no-empty-function */
'use client'
import Image from 'next/image'
import logo from './assets/logo.svg'
import { Trash2, Stars } from 'lucide-react'
import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism-dark.css' // Example style, you can use another
import { useCompletion } from 'ai/react'
export default function Home() {
  const [schema, setSchema] = useState('')
  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: '/api/generate-sql',
    body: {
      schema,
    },
  })
  const result = completion

  function handleClear() {}
  return (
    <div className="max-w-[430px] mx-auto px-4 pt-12 pb-4">
      <header className="flex items-center justify-between">
        <Image src={logo} alt="" />
        <button type="button">
          <Trash2 className="h-6 w-6 text-snow" strokeWidth={1} />
        </button>
      </header>
      <form
        onSubmit={handleSubmit}
        className="py-8 w-full flex flex-col text-foam"
      >
        <label htmlFor="schema" className="text-base font-light tracking-tight">
          Cole seu código SQL aqui:
        </label>
        <div className="my-4 h-40 overflow-auto bg-blueberry-600 border-t-2 border-b-2 border-l-2 border-r-2 border-blueberry-300 rounded-md focus-within:ring-2 focus-within:ring-lime-600">
          <Editor
            textareaId="schema"
            value={schema}
            onValueChange={(schema) => setSchema(schema)}
            highlight={(code) => highlight(code, languages.sql, 'sql')}
            padding={16}
            textareaClassName="outline-none"
            className="font-mono "
          />
        </div>
        <label
          htmlFor="question"
          className="text-base font-light tracking-tight"
        >
          Faça uma pergunta sobre o código
        </label>
        <textarea
          value={input}
          onChange={handleInputChange}
          className="my-4 bg-blueberry-600 border-2 border-blueberry-300 rounded-md outline-none focus:ring-2 focus:ring-lime-600"
          name="question"
          id="question"
        />
        <button className="text-pistachio flex items-center justify-center gap-2 rounded-xl border border-pistachio h-14">
          <Stars className="w-6 h-6" /> Perguntar à inteligência artificial
        </button>
      </form>

      <div className="flex flex-col mt-6">
        <span className="text-foam text-base font-light tracking-tight">
          Resposta:{' '}
        </span>
        <div className="my-4 h-40 overflow-auto bg-blueberry-600 border-t-2 border-b-2 border-l-2 border-r-2 border-blueberry-300 rounded-md focus-within:ring-2 focus-within:ring-lime-600">
          <Editor
            readOnly
            value={result}
            onValueChange={() => {}}
            highlight={(code) => highlight(code, languages.sql, 'sql')}
            padding={16}
            textareaClassName="outline-none"
            className="font-mono "
          />
        </div>
      </div>
    </div>
  )
}
