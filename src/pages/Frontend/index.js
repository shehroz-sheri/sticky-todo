import React from 'react'
import {
    Routes,
    Route
} from 'react-router-dom'
import Home from "./Home"
import Personal from "./Personal/Personal"
import List3 from "./List3/List3"
import Business from "./Bussiness/Bussiness"
import Today from "./Today/Today"
import Upcoming from "./Upcoming/Upcoming"
import Layout from '../components/Layout'
import Calendar from './Calendar/Calendar'
export default function index() {
    return (
        <>
            <Routes >
                <Route path='/'
                    element={< Layout />
                    } >
                    <Route index element={< Home />
                    }
                    />
                    <Route path='sticky'
                        element={< Home />
                        }
                    />
                    <Route path='personal'
                        element={< Personal />
                        }
                    />
                    <Route path='list3'
                        element={< List3 />
                        }
                    />
                    <Route path='business'
                        element={< Business />
                        }
                    />
                    <Route path='today'
                        element={< Today />
                        }
                    />
                    <Route path='upcoming'
                        element={< Upcoming />
                        }
                    />
                    <Route path='calendar'
                        element={< Calendar />
                        }
                    />
                </Route>
            </Routes>
        </>
    )
}