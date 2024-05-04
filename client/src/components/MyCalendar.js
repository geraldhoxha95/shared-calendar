import {useCallback, useEffect, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import { useNavigate } from 'react-router-dom'
import styles from '../styles/event-detail.module.css'
import moment from 'moment'
import {formatDate} from "../helpers/dateHelpers";
import {Button, Box, TextField} from '@mui/material'

const localizer = momentLocalizer(moment)

const MyCalendar = () => {
    const [myEvents, setEvents] = useState([])
    const [activeEvent, setActiveEvent] = useState(null)
    const [detailModal, setDetailModal] = useState(false)
    const [newEvent, setNewEvent] = useState(false)
    const [newEventDuration, setNewEventDuration] = useState({})
    const [newEventTitle, setNewEventTitle] = useState('')
    const [newEventCommits, setNewEventCommits] = useState('')
    const [loggedIn, setLoggedIn] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URI}?token=${localStorage.getItem('token')}&username=${localStorage.getItem('username')}`)
            .then(response => response.json())
            .then(response => {
                const modifiedEvents = response.map(event => {
                    return {
                        start: new Date(event.start),
                        end: new Date(event.end),
                        title: event.title,
                        commits: event.commits
                    }
                })
                setEvents(modifiedEvents)
            })
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
    })

    const handleSelectSlot = ({ start, end }) => {
        setNewEventDuration({ start, end })
        setNewEvent(true)
    }

    const handleSelectEvent = useCallback(
        (event) => {
            setActiveEvent(myEvents.find(e => e.title === event.title))
            setDetailModal(true)
        },
        [myEvents]
    )

    const deleteEvent = useCallback(() => {
        const idx = myEvents.indexOf(activeEvent)
        myEvents.splice(idx, 1)
        setEvents(myEvents)
        setDetailModal(false)
        setActiveEvent(null)
        fetch(`${process.env.REACT_APP_BACKEND_URI}/deleteEvent?token=${localStorage.getItem('token')}&username=${localStorage.getItem('username')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: activeEvent.title })
        })

    }, [myEvents, activeEvent])

    const submitEvent = useCallback(() => {
        setEvents((prev) => [...prev, { start: newEventDuration.start, end: newEventDuration.end, title: newEventTitle, commits: newEventCommits }])
        setNewEvent(false)
        fetch(`${process.env.REACT_APP_BACKEND_URI}/createEvent?token=${localStorage.getItem('token')}&username=${localStorage.getItem('username')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: newEventDuration.start, end: newEventDuration.end, title: newEventTitle, commits: newEventCommits })
        })
    }, [newEventDuration, newEventTitle, newEventCommits])

    const closeModal = () => setDetailModal(false)
    const closeNewEventModal = () => setNewEvent(false)
    const logout = () => {
        setLoggedIn(false)
        localStorage.clear()
    }

    return (
        <div>
            <Button className={styles.logoutButton} onClick={logout} variant="outlined">Logout</Button>
            {detailModal && <div className={styles.overlay}></div>}
            {detailModal && <Box className={styles.component}>
                <div className={styles.componentText}>
                    Event Title: {activeEvent.title}<br/>
                    Who is Going: {activeEvent.commits}<br/>
                    Start Time: {formatDate(activeEvent.start)}<br/>
                    End Time: {formatDate(activeEvent.end)}
                </div>
                <div className={styles.buttonContainer}>
                    <Button  style={{marginRight: 20 }} variant="outlined" onClick={deleteEvent}>Delete Event</Button>
                    <Button variant="outlined" onClick={closeModal}>Close</Button>
                </div>
            </Box>}
            {newEvent && <div className={styles.overlay}></div>}
            {newEvent && <Box className={styles.component}>
                <div className={styles.componentText}>

                    <TextField id="outlined-basic" variant="outlined" helperText='Event Name'
                               onChange={(e) => setNewEventTitle(e.target.value)}/>
                    <TextField id="outlined-basic" variant="outlined" helperText='Who is Going'
                               onChange={(e) => setNewEventCommits(e.target.value)}/>
                </div>
                    <div className={styles.buttonContainer}>
                        <Button style={{marginRight: 20}} variant="outlined" onClick={submitEvent}>Submit</Button>
                        <Button variant="outlined" onClick={closeNewEventModal}>Close</Button>
                    </div>
            </Box>}
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                events={myEvents}
                style={{ height: 500 }}
            />
            <footer>
                 created by Truvian Softworks LLC
            </footer>
        </div>
)}

export default MyCalendar
