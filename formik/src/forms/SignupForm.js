import React from 'react'
import DropList from './DropList';
import { withFormik, ErrorMessage, Form, Field } from 'formik'
import * as yup from 'yup'
import Error from './Error';

const options = [
    { value: 'Art', label: 'Art' },
    { value: 'Sport', label: 'Sport' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Machine learning', label: 'Machine' },
    { value: 'Science', label: 'Science' },
]

const formikWrapper = withFormik({
    mapPropsToValues: () => ({
        username: '',
        email: '',
        topics: []
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values,
            topics: values.topics.map(t => t.value)
        }

        setTimeout(() => {
            alert(JSON.stringify(payload, null, 2))
            setSubmitting(false)
        }, 3000)
    },
    validationSchema: yup.object().shape({
        username: yup.string().required('Please enter a username'),
        email: yup.string().email('Please enter a valid email')
            .required('Please enter your email'),
        topics: yup.array().min(3, 'Please select 3 items')
            .of(yup.object().shape({
                value: yup.string().required(),
                label: yup.string().required(),
            }))
    })
})

const SignupForm = (props) => {

    const {
        values,
        // handleChange,
        // handleBlur,
        setFieldValue,
        setFieldTouched,
        // handleSubmit,
        handleReset,
        isSubmitting,
        dirty
    } = props
    return (
        <Form
            className='p-5'
        // onSubmit={handleSubmit}
        >
            <h1>
                Sign up Form
            </h1>

            <div className='form-group'>
                <label>User name:</label>
                <Field
                    name='username'
                    type='text'
                    placeholder='Enter username'
                    className='form-control'
                // value={values.username}
                // onChange={handleChange}
                // onBlur={handleBlur}
                />
                <ErrorMessage component={Error} name='username' />
            </div>

            <div className='form-group'>
                <label>Email:</label>
                <Field
                    name='email'
                    type='email'
                    placeholder='Enter email'
                    className='form-control'
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                />
                <ErrorMessage component={Error} name='email' />
            </div>

            <div className='form-group'>
                <label>Fav topics</label>
                <DropList
                    value={values.topics}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={options}
                />
                <ErrorMessage component={Error} name='topics' />
            </div>

            <span className='p-3'>
                <button
                    onClick={handleReset}
                    className='btn btn-secondary'
                    disabled={!dirty || isSubmitting}
                >Reset</button>
            </span>

            <span className='p-3'>
                <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={isSubmitting}
                >
                    Submit</button>
            </span>

        </Form>
    );
}

const EnhancedForm = formikWrapper(SignupForm)

export default EnhancedForm;
// export default formikWrapper(SignupForm);

/**BEFORE FINAL LESSON ****/

// import React from 'react'
// import DropList from './DropList';
// import { withFormik, ErrorMessage } from 'formik'
// import * as yup from 'yup'
// import Error from './Error';

// const options = [
//     { value: 'Art', label: 'Art' },
//     { value: 'Sport', label: 'Sport' },
//     { value: 'Technology', label: 'Technology' },
//     { value: 'Machine learning', label: 'Machine' },
//     { value: 'Science', label: 'Science' },
// ]

// const formikWrapper = withFormik({
//     mapPropsToValues: () => ({
//         username: '',
//         email: '',
//         topics: []
//     }),
//     handleSubmit: (values, { setSubmitting }) => {
//         const payload = {
//             ...values,
//             topics: values.topics.map(t => t.value)
//         }

//         setTimeout(() => {
//             alert(JSON.stringify(payload, null, 2))
//             setSubmitting(false)
//         }, 3000)
//     },
//     validationSchema: yup.object().shape({
//         username: yup.string().required('Please enter a username'),
//         email: yup.string().email('Please enter a valid email')
//             .required('Please enter your email'),
//         topics: yup.array().min(3, 'Please select 3 items')
//             .of(yup.object().shape({
//                 value: yup.string().required(),
//                 label: yup.string().required(),
//             }))
//     })
// })

// const SignupForm = (props) => {

//     const {
//         values, handleChange,
//         handleBlur, setFieldValue,
//         setFieldTouched, handleSubmit,
//         handleReset, isSubmitting,
//         dirty
//     } = props
//     return (
//         <form className='p-5' onSubmit={handleSubmit}>
//             <h1>
//                 Sign up Form
//             </h1>

//             <div className='form-group'>
//                 <label>User name:</label>
//                 <input
//                     name='username'
//                     type='text'
//                     placeholder='Enter username'
//                     className='form-control'
//                     value={values.username}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                 />
//                 <ErrorMessage component={Error} name='username' />
//             </div>

//             <div className='form-group'>
//                 <label>Email:</label>
//                 <input
//                     name='email'
//                     type='email'
//                     placeholder='Enter email'
//                     className='form-control'
//                     value={values.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                 />
//                 <ErrorMessage component={Error} name='email' />
//             </div>

//             <div className='form-group'>
//                 <label>Fav topics</label>
//                 <DropList
//                     value={values.topics}
//                     onChange={setFieldValue}
//                     onBlur={setFieldTouched}
//                     options={options}
//                 />
//                 <ErrorMessage component={Error} name='topics' />
//             </div>

//             <span className='p-3'>
//                 <button
//                     onClick={handleReset}
//                     className='btn btn-secondary'
//                     disabled={!dirty || isSubmitting}
//                 >Reset</button>
//             </span>

//             <span className='p-3'>
//                 <button
//                     type='submit'
//                     className='btn btn-primary'
//                     disabled={isSubmitting}
//                 >
//                     Submit</button>
//             </span>

//         </form>
//     );
// }

// const EnhancedForm = formikWrapper(SignupForm)

// export default EnhancedForm;
// // export default formikWrapper(SignupForm);