import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/perfil.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';

import styles from '../styles/Usuario.module.css';

export default function Registro() {

   const [file, setFile] = useState() 
  
    const formik = useFormik({
      initialValues : {
        email: 'eu@1.com',
        username: 'exemplo123',
        password : 'exemplo@123'
      },
      validate : registerValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        values = await Object.assign(values, {profile : file || ''})
        console.log(values);
      }
    })

    /** formik não aguenta o upload de arquivos, então é necessário criar essa funcionalidade */
    const onUpload = async e => {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }

    return (
      <div className="container mx-auto">
  
        <Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center'>
          <div className={styles.glass} style={{ width: '45%'}}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Cadastro</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Estamos felizes por te ter aqui!
              </span>
            </div>
  
            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <label htmlFor='profile'>
                      <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                    </label>

                    <input onChange={onUpload} type='file' id='profile' name='profile' />
                </div>
  
                <div className="textbox flex flex-col items-center gap-6">
                    <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                    <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Usuário*' />
                    <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Senha*' />
                    <button className={styles.btn} type='submit'>Cadastrar</button>
                </div>
  
                <div className="text-center py-4">
                  <span className='text-gray-500'>Já é cadastrado? <Link className='text-red-500' to="/usuario">Entrar</Link></span>
                </div>
  
            </form>
  
          </div>
        </div>
      </div>
    )
  }