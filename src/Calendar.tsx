import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    parse,
    startOfToday,
} from 'date-fns'
import { useEffect, useState } from 'react'
import { SpecialDate } from './App';

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
];

export const Calendar = ({ specialDays, onChange }: { specialDays: SpecialDate[], onChange(date: string): void }) => {
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(format(startOfToday(), 'MMM-yyyy'));
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        if (selectedDay && time) {
            onChange(`${format(selectedDay, 'yyyy-MM-dd')} ${time}`)
        }
    }, [selectedDay, time])

    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const disabledDates = specialDays.filter((day) => day.type === 'NATIONAL_HOLIDAY').map(day => day.date);
    const observanceDates = specialDays.filter((day) => day.type === 'OBSERVANCE').map(day => day.date);

    return (
        <div className='flex flex-col sm:flex-row gap-3'>
            <div>
                <label
                    htmlFor="calendar"
                    className="mb-2 block text-base text-[#000853]"
                >
                    Calendar
                </label>
                <div className="md:pr-14 w-full sm:w-[300px]" id="calendar">
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Arrow left">
                                    <path id="Polygon" d="M9.5 16.866C8.83333 16.4811 8.83333 15.5189 9.5 15.134L18.5 9.93782C19.1667 9.55292 20 10.034 20 10.8038L20 21.1962C20 21.966 19.1667 22.4471 18.5 22.0622L9.5 16.866Z" fill="#CBB6E5" />
                                </g>
                            </svg>
                        </button>
                        <h2 className="flex-auto font-semibold text-gray-900">
                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Arrow right">
                                    <path id="Polygon" d="M22.5 16.866C23.1667 16.4811 23.1667 15.5189 22.5 15.134L13.5 9.93782C12.8333 9.55292 12 10.034 12 10.8038L12 21.1962C12 21.966 12.8333 22.4471 13.5 22.0622L22.5 16.866Z" fill="#CBB6E5" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>Mo</div>
                        <div>Tu</div>
                        <div>We</div>
                        <div>Th</div>
                        <div>Fr</div>
                        <div>Sa</div>
                        <div>Su</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => {
                            return (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day) ? getDay(day) - 1 : 6],
                                        'py-1.5'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDay(day)}
                                        disabled={!getDay(day) || disabledDates.includes(format(day, 'yyyy-MM-dd'))}
                                        className={classNames(
                                            !!selectedDay && isEqual(day, selectedDay) && 'text-white',
                                            !!selectedDay && isEqual(day, selectedDay) && 'bg-[#761BE4]',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full disabled:text-[#898DA9]'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    {selectedDay && observanceDates.includes(format(selectedDay, 'yyyy-MM-dd')) ?
                        <div className='flex gap-1 items-center text-[#000853] text-sm'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="error-icon">
                                    <path id="Vector" d="M9 17C7.41775 17 5.87104 16.5308 4.55544 15.6518C3.23985 14.7727 2.21447 13.5233 1.60897 12.0615C1.00347 10.5997 0.84504 8.99113 1.15372 7.43928C1.4624 5.88743 2.22433 4.46197 3.34315 3.34315C4.46197 2.22433 5.88743 1.4624 7.43928 1.15372C8.99113 0.845037 10.5997 1.00346 12.0615 1.60896C13.5233 2.21447 14.7727 3.23985 15.6518 4.55544C16.5308 5.87103 17 7.41775 17 9C17 11.1217 16.1571 13.1566 14.6569 14.6569C13.1566 16.1571 11.1217 17 9 17ZM8.00667 13C8.00667 13.2652 8.11203 13.5196 8.29956 13.7071C8.4871 13.8946 8.74145 14 9.00667 14C9.27189 14 9.52624 13.8946 9.71378 13.7071C9.90131 13.5196 10.0067 13.2652 10.0067 13V8.40667C10.0067 8.27535 9.9808 8.14531 9.93055 8.02398C9.88029 7.90266 9.80664 7.79242 9.71378 7.69956C9.62092 7.6067 9.51068 7.53304 9.38935 7.48279C9.26803 7.43253 9.13799 7.40667 9.00667 7.40667C8.87535 7.40667 8.74531 7.43253 8.62399 7.48279C8.50266 7.53304 8.39242 7.6067 8.29956 7.69956C8.2067 7.79242 8.13305 7.90266 8.08279 8.02398C8.03254 8.14531 8.00667 8.27535 8.00667 8.40667V13ZM9 4C8.77321 4 8.55152 4.06725 8.36295 4.19325C8.17438 4.31925 8.02741 4.49833 7.94062 4.70786C7.85383 4.91738 7.83113 5.14794 7.87537 5.37037C7.91961 5.5928 8.02882 5.79712 8.18919 5.95748C8.34955 6.11785 8.55387 6.22706 8.7763 6.2713C8.99873 6.31555 9.22929 6.29284 9.43881 6.20605C9.64834 6.11926 9.82743 5.97229 9.95342 5.78372C10.0794 5.59515 10.1467 5.37346 10.1467 5.14667C10.1467 4.84255 10.0259 4.55089 9.81082 4.33585C9.59578 4.12081 9.30412 4 9 4Z" fill="#CBB6E5" />
                                </g>
                            </svg>{specialDays.find(day => day.date === format(selectedDay, 'yyyy-MM-dd'))!.name}
                        </div> : null
                    }
                </div>
            </div>
            {selectedDay && (
                <div>
                    <label
                        htmlFor="time"
                        className="mb-2 block text-base text-[#000853]"
                    >
                        Time
                    </label>
                    <div className='flex flex-row sm:flex-col gap-3' id="time">
                        {['12:00', '14:00', '16:30', '18:30', '20:00'].map(val => {
                            return (
                                <button
                                    key={val}
                                    className={classNames(
                                        'w-[76px] h-[46px] text-base text-[#000853] hover:border-2 hover:border-[#761BE4] rounded-[8px]',
                                        val !== time && 'border border-[#CBB6E5]',
                                        val === time && 'border-2 border-[#761BE4]'
                                    )}
                                    onClick={() => setTime(val)}
                                >
                                    {val}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}