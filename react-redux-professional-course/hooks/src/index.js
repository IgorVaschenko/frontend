import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';


const MyContext = React.createContext()



const App = () => {

  return (

    <HookUseEffect />


    // <MyContext.Provider value={`44-539-69-42`}>
    //   <HookContext/>
    //   <HookSwitcher />
    // </MyContext.Provider>
  )

}


const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}/`)
    .then(res => res.json())
    .then(data => data)
}

const useRequest = (request) => {

  const initialState = useMemo(() => ({
    data: null,
    loading: true,
    error: false
  }), [])

  const [dataState, setDataState] = useState(initialState)
  useEffect(() => {
    setDataState(initialState)
    let cancelled = false
    request()
      .then(data => !cancelled && setDataState({
        data,
        loading: false,
        error: false
      }))
      .catch(() => !cancelled && setDataState({
        data: null,
        loading: false,
        error: true
      }))

    return () => cancelled = true
  }, [request, initialState])

  return dataState
}

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id])
  return useRequest(request)

  // const [name, setName] = useState('')
  // useEffect(() => {
  //   let cancelled = false
  //   fetch(`https://swapi.dev/api/planets/${id}/`)
  //     .then(res => res.json())
  //     .then(data => !cancelled && setName(data.name))

  //   return () => cancelled = true
  // }, [id])

  // return name
}

const PlanetInfo = ({ id }) => {

  // const [name, setName] = useState('')

  // const planetName = async (id) => {
  //   return await fetch(`https://swapi.dev/api/planets/${id}/`)
  //     .then(res => res.json())
  //     .then(data => setName(data.name))
  // }

  // useEffect(() => {
  //   let cancelled = false
  //   fetch(`https://swapi.dev/api/planets/${id}/`)
  //     .then(res => res.json())
  //     .then(data => !cancelled && setName(data.name))

  //   return () => cancelled = true
  // }, [id])

  const { data, loading, error } = usePlanetInfo(id)

  if (loading) return <div>loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>{id} - {data.name}</div>
  )
}


const Notification = () => {
  const [isNotification, setIsNotification] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsNotification(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [isNotification])

  return <>
    {isNotification && <div>Alert</div>}
    <button onClick={() => setIsNotification(true)}>notification</button>
  </>
}

const HookCounter = ({ value, visible }) => {

  // useEffect(() => console.log('mount/update'))
  // useEffect(() => { console.log('mount') }, [])
  // useEffect(() => { console.log('update') }, [value])
  // useEffect(() => { console.log('update/visible') }, [visible])
  // useEffect(() => () => console.log('unmount'), [])

  return (
    <div>{value}</div>
  );
}

const HookUseEffect = () => {
  const [value, setValue] = useState(1)
  const [visible, setVisible] = useState(true)

  if (visible) {
    return (
      <div style={{ padding: '10px', backgroundColor: 'gray' }}>
        <button onClick={() => setValue((cnt) => cnt + 1)}>+</button>
        <button onClick={() => setVisible((st) => !st)}>hide</button>
        <HookCounter value={value} visible={visible} />
        <Notification />
        <PlanetInfo id={value} />
      </div>
    )
  }
  return <button onClick={() => setVisible('black')}>show</button>
}

const HookContext = () => {
  const value = useContext(MyContext)
  return (
    <div>{value}</div>
  );
}

const HookSwitcher = () => {
  const [color, setColor] = useState('gray')
  const [fontSize, setFontSize] = useState(12)

  return (
    <div style={{ padding: '10px', backgroundColor: color, fontSize }}>
      <button onClick={() => setColor('gray')}>gray</button>
      <button onClick={() => setColor('black')}>black</button>
      <span>State font test</span>
      <button onClick={() => setFontSize((font) => font + 2)}>+</button>
      <button onClick={() => setFontSize((font) => font - 2)}>-</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
