import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'
import '../styles/chartpage.sass'
import LeftArrowIcon from '../assets/icons/left-arrow.png'

const ChartPage  = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const charts = [
        { id: '63e9c1a7-91d7-4b9f-8091-4662156715c8', title: 'Chart 1' },
        { id: '63e9cafc-16d4-4e4d-83f5-22851cfed413', title: 'Chart 2' },
        { id: '63e9cbab-16d4-481a-83bb-22851cff2072', title: 'Chart 3' },
        { id: '63e9c228-1dbb-477e-8364-9cdd99def969', title: 'Chart 4' },
        { id: '63e9c0e7-1086-4646-8c37-2973fc29ec49', title: 'Chart 5' },
    ]

    const handleClick = (index) => {setActiveIndex(index)}

    return (
        <main>
        <Link to="/profile">
            <img
            className="left-arrow-icon"
            src={LeftArrowIcon}
            />
        </Link>
        <div className='charts-container'>
            {charts.map((chart, index) => (
            <div
                key={chart.id}
                style={{
                display: index === activeIndex ? 'block' : 'none',
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            >
            <iframe
                width="640"
                height="480"
                src={`https://charts.mongodb.com/charts-small-talk-fezzt/embed/charts?id=${chart.id}&maxDataAge=3600&theme=light&autoRefresh=true`}
            />
            </div>
        ))}
        <div className="chart-navigation">
            {charts.map((chart, index) => (
            <button
                key={chart.id}
                onClick={() => handleClick(index)}
                className={`chart-navigation-item ${index === activeIndex ? 'active' : ''}`}
            >
                {chart.title}
            </button>
            ))}
        </div>
        </div>
    </main>
    )
}

export default ChartPage