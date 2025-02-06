import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";

function Index() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today",
        }}
        nowIndicator={true}
        // events={events}
        locale="ko"
        height="100%"
        aspectRatio={1.8}
        eventDidMount={info => {
          if (info.event.end) {
            info.el.style.borderRadius = "5px";
          }
        }}
      />
    </div>
  );
}

export default Index;
