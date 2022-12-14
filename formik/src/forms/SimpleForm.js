import React from 'react';
import { Formik, ErrorMessage } from 'formik'

const SimpleForm = () => {
    return (
        <Formik
            initialValues={{ name: '' }} //начальные значения для формы

            onSubmit={(values, { setSubmitting }) => {// действия по сабмиту
                setTimeout(() => {
                    // alert(values)
                    console.log('form values', values);
                    setSubmitting(false) // отправка запроса, можно блочить кнопку по boolean
                }, 2000)
            }}

            validate={values => {//валидация формы + ложим в ошибку значение
                let errors = {}

                if (!values.name) {
                    errors.name = 'Please enter a name'
                }

                return errors
            }}
            render={({ handleSubmit, handleChange, values, errors, handleBlur, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        value={values.name}
                        type="text"
                        name='name'
                        placeholder='Enter your name'
                        onBlur={handleBlur} //фокус
                    />
                    <button
                        disabled={isSubmitting} // отправка, тогда блок
                    >
                        Submit</button>

                    <ErrorMessage // импортируем готовый компонент из формика и закидываем value
                        name='name'
                    />
                </form>
            )}
        >
            {
                // ({ handleSubmit, handleChange, values, errors, handleBlur, touched, isSubmitting }) => (
                //     <form onSubmit={handleSubmit}>
                //         <input
                //             onChange={handleChange}
                //             value={values.name}
                //             type="text"
                //             name='name'
                //             placeholder='Enter your name'
                //             onBlur={handleBlur} //фокус
                //         />
                //         <button
                //             disabled={isSubmitting} // отправка, тогда блок
                //         >
                //             Submit</button>

                //         {errors.name &&
                //             <div style={{ color: 'red' }}>
                //                 {errors.name}
                //             </div>
                //         }
                //     </form>
                // )
            }
        </Formik>
    );
}

export default SimpleForm;