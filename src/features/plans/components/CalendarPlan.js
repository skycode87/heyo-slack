import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { messages } from "../../../helpers/calendar-messages-es";

import "react-big-calendar/lib/css/react-big-calendar.css";

import "moment/locale/es";

const localizer = momentLocalizer(moment);
moment.locale("es");

const CalendarEvent = ({ event }) => {
  const { name } = event;
  return <div>{name}...=) </div>;
};

const MyCalendar = ({ calendar, setCalendar, eventos, setSelectedPlan }) => {
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

  const [eventsList, setEventsList] = useState([]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.color || "#4FB601",
      opacity: 0.8,
      color: "#FFFFFF",
      display: "block",
    };

    return {
      style,
    };
  };

  useEffect(() => {
    if (eventos.length > 0) {
      setEventsList(
        eventos.map((item) => ({
          _id: item._id,
          name: item.name,
          minLimit: 1,
          maxLimit: 10,
          start: moment(item.startdate).toDate(),
          end: moment(item.closuredate).toDate(),
          color: item.color,
        }))
      );
    }
  }, [eventos]);

  const onDoubleClickEvent = (e) => {
    setSelectedPlan(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
    // console.log("click1");
  };

  const onSelectSlot = (e) => {
    setCalendar(e);
  };

  const onViewChange = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  return (
    <div className="calendar-screen">
      <Calendar
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        selectable="true"
        onSelectSlot={onSelectSlot}
      />
    </div>
  );
};

export default MyCalendar;
