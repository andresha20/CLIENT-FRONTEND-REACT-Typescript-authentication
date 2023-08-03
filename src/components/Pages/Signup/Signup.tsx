import * as React from 'react';
import { useSession } from '../../../providers/Auth';
import { useForm, SubmitHandler } from "react-hook-form"
import ErrorWarning from '../../Common/ErrorWarning';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  User_name: string,
  User_lastname: string,
  Doc_type: number,
  Document: number,
  Genre: number,
  User_email: string,
  Phone: number,
  Password: string,
  Password_repeat: string
}

interface IAppProps {}

const Signup: React.FunctionComponent<IAppProps> = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const [isLogin, setIsLogin] = React.useState(true);
    const navigate = useNavigate();
    const { session, sessionLoading, signup, login } = useSession();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const mutatedData = { ...data};
        if (isLogin) {
            const validKeys = ["Password", "User_email"];
            Object.keys(data).map((key) => {
                if (validKeys.includes(key) == false) {
                    delete mutatedData[key as keyof Inputs];
                }
            })
            login && login(data);
        } else {
            console.log(data)
            signup && signup(data);
        }
    }

    console.log(watch("User_name")) // watch input value by passing the name of it

    React.useEffect(() => {
        if (sessionLoading) return;
        if (session) {
            navigate('/dashboard');
            return;
        }
        return () => {};
    }, [session, sessionLoading, navigate])

    if (sessionLoading) return <></>

    return <section className='max-w-xl mx-auto border-2 dark:text-white border-gray-200 bg-white dark:bg-gray-900 rounded-lg p-5 md:p-10 w-full'>
        <h3>{isLogin ? 'Login' : 'Signup'}</h3>
        <p>{isLogin ? 'If you have already registered an account, use the fields below' : 'Create a free account'}</p>
        {!isLogin
            ?
            <section className=''>
                <form onSubmit={handleSubmit(onSubmit)} className='block md:flex md:space-x-10 md:space-y-0 space-y-5'>
                    <div className='w-6/12'>
                        <div className='form__group field'>
                            <input placeholder='John' className='form__field' {...register("User_name", { required: isLogin ? false : true, minLength: 5, maxLength: 30 })} />
                            {errors.User_name && <ErrorWarning>Name is a required field and it must be at least 5 and max 30 characters.</ErrorWarning>}
                            <label className='block font-bold form__label'>Name (*)</label>
                        </div>
                        <div className="form__group field">
                            <input className='form__field' placeholder='Doe' {...register("User_lastname", { required: isLogin ? false : true, minLength: 5, maxLength: 30  })} />
                            {errors.User_name && <ErrorWarning>Last name is a required field and it must be at least 5 and max 30 characters.</ErrorWarning>}
                            <label className='block font-bold form__label'>Last name (*)</label>
                        </div>
                        <div className="form__group field">
                            <input className='form__field' type='number' placeholder='1001237619' {...register("Document", { required: isLogin ? false : true, min: 43000000, max: 1999999999  })} />
                            {errors.Document && <ErrorWarning>Must be a valid identification number.</ErrorWarning>}
                            <label className='block font-bold form__label'>Document (*)</label>
                        </div>
                        <div className="form__group field">
                            <input className='form__field' type='email' placeholder='johndoe@gmail.com' {...register("User_email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  })} />
                            {errors.User_email && <ErrorWarning>Please insert a valid email address.</ErrorWarning>}
                            <label className='block font-bold form__label'>Email (*)</label>
                        </div>
                        <div className="form__group field">
                            <input className='form__field' type='number' placeholder='3043716117' {...register("Phone", { required: isLogin ? false : true, min: 3000000000, max: 3999999999 })} />
                            {errors.Document && <ErrorWarning>Must be a valid Colombian phone number.</ErrorWarning>}
                            <label className='block font-bold form__label'>Phone (*)</label>
                        </div>
                        <div className="form__group field">
                            <input className='form__field' type='password' placeholder='********' {...register("Password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/ })} />
                            {errors.Password && <ErrorWarning>Password must be at least 10 characters of length, have 1 uppercase letter, 1 special character and no spaces.</ErrorWarning>}
                            <label className='block font-bold form__label'>Password (*)</label>
                        </div>
                        {watch('Password').length > 0 &&
                            <div className="form__group field">
                                <input className='form__field' type='password' placeholder='********' {...register("Password_repeat", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/ })} />
                                {(errors.Password_repeat || watch("Password") !== watch('Password_repeat')) && <ErrorWarning>Password does not match.</ErrorWarning>}
                                <label className='block font-bold form__label'>Confirm password (*)</label>
                            </div>
                        }
                    </div>
                    <div className='w-6/12'>
                        <div className='py-5'>
                            <label className='block font-bold'>Genre (*)</label>
                            <input type='radio' value={1} {...register("Genre", { required: isLogin ? false : true })} />Hombre<br></br>
                            <input type='radio' value={2} {...register("Genre", { required: isLogin ? false : true })} />Mujer<br></br>
                            <input type='radio' value={3} {...register("Genre", { required: isLogin ? false : true })} />Other<br></br>
                            {errors.Genre && <ErrorWarning>We need to know your genre.</ErrorWarning>}
                        </div>
                        <div className='py-5'>
                            <label className='block font-bold'>Document type (*)</label>
                            <input type='radio' value={1} {...register("Doc_type", { required: isLogin ? false : true })} />National Identification Document<br></br>
                            <input type='radio' value={2} {...register("Doc_type", { required: isLogin ? false : true })} />Passport<br></br>
                            <input type='radio' value={3} {...register("Doc_type", { required: isLogin ? false : true })} />Foreigner Identification Number<br></br>
                            {errors.Doc_type && <ErrorWarning>You must pick a document type.</ErrorWarning>}
                        </div>
                        <input type="submit" value='Signup' className='mt-10 border-none bg-yellow-500 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 text-white hover:bg-gray-900 transition-all cursor-pointer rounded p-3 font-bold' />
                        <p onClick={() => setIsLogin(state => !state)} className='text-sm underline hover:text-yellow-500 cursor-pointer transition-all'>{isLogin ? "Don't have an account? Signup" : "Have an account? Log in"}</p>
                    </div>
                </form>
            </section>
            :
            <section>
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="form__group field">
                        <input className='form__field' type='email' placeholder='johndoe@gmail.com' {...register("User_email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} />
                        {errors.User_email && <ErrorWarning>Please insert a valid email address.</ErrorWarning>}
                        <label className='block font-bold form__label'>Email (*)</label>
                    </div>
                    <div className="form__group field">
                        <input className='form__field' type='password' placeholder='********' {...register("Password", { required:  true, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/  })} />
                        {errors.Password && <ErrorWarning>Please insert a valid password.</ErrorWarning>}
                        <label className='block font-bold form__label'>Password (*)</label>
                    </div>
                    <input type="submit" value='Login' className='mt-10 border-none bg-yellow-500 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 text-white hover:bg-gray-900 transition-all cursor-pointer rounded p-3 font-bold' />
                </form>
                <p onClick={() => setIsLogin(state => !state)} className='text-sm underline text-right hover:text-yellow-500 cursor-pointer transition-all'>{isLogin ? "Don't have an account? Signup" : "Have an account? Log in"}</p>
            </section>
        }
    </section>
}

export default Signup;