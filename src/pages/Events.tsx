// import React from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// type Event = {
//   date: string;
//   venue: string;
// };

// const events: Event[] = [
//   { date: "2nd November", venue: "Dehradun - Brewestate" },
//   { date: "8th November", venue: "Prism Hyderabad" },
//   { date: "9th November", venue: "Chennai Flame" },
//   { date: "10th November", venue: "Nyx - Guwahati" },
//   { date: "15th November", venue: "Novaara - Mumbai" },
//   { date: "16th November", venue: "Lord Of Drinks Ranchi" },
//   { date: "17th November", venue: "Uk 27 Belgam" },
//   { date: "22nd November", venue: "Xena Hyderabad" },
//   { date: "23rd November", venue: "Ivory Bhopal" },
//   { date: "29th November", venue: "Nagpur" },
//   { date: "30th November", venue: "Guwahati House Of Madira" },
//   { date: "4th December", venue: "Wedding Mumbai" },
//   { date: "7th December", venue: "Hashtag - Kolkata" },
//   { date: "14th December", venue: "Xena - Hyderabad" },
//   { date: "20th December", venue: "Novaara - Mumbai" },
//   { date: "21st December", venue: "Hashtag - Siliguri" },
//   { date: "24th December", venue: "Trevor - Kolkata" },
//   { date: "28th December", venue: "Wedding - Nashik" },
//   { date: "30th December", venue: "Sing - Goa" },
//   { date: "31st December", venue: "Ranchi" },
//   { date: "3rd January", venue: "Wedding Mumbai" },
//   { date: "16th January", venue: "Flames Chennai" },
//   { date: "17th January", venue: "Xena Hyderabad" },
// ];

// const Events = () => {
//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-24 px-4">
//         <div className="max-w-5xl mx-auto">
//           <h1 className="text-5xl font-extrabold text-center mb-12 text-neon animate-glow">
//             DJ Events Schedule
//           </h1>

//           <div className="relative">
//             {/* Vertical line */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/50 h-full"></div>

//             {/* Events */}
//             <div className="space-y-10">
//               {events.map((event, index) => {
//                 const isLeft = index % 2 === 0;
//                 return (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-${isLeft ? "start" : "end"} relative`}
//                   >
//                     {/* Event container */}
//                     <div
//                       className={`w-1/2 p-6 bg-card/50 backdrop-blur-md border border-primary/30 rounded-2xl shadow-lg transform transition hover:scale-105 ${
//                         isLeft ? "ml-0 text-left" : "ml-auto text-right"
//                       }`}
//                     >
//                       <p className="text-lg font-semibold text-muted-foreground">{event.date}</p>
//                       <p className="text-xl font-bold text-foreground">{event.venue}</p>
//                     </div>

//                     {/* Circle on the line */}
//                     <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full z-20 shadow-lg"></div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Events;




//=================================================================================================================================


import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/api";

type Event = {
  _id?: string;
  date: string;
  venue: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events");
      const eventList: Event[] = res.data.data || res.data.events || res.data || [];

      // ✅ Sort events by date (ascending)
      eventList.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB; // earliest first
      });

      setEvents(eventList);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-neon animate-glow">
            DJ Events Schedule
          </h1>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading events...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : events.length === 0 ? (
            <p className="text-center text-muted-foreground">No events found.</p>
          ) : (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/50 h-full"></div>

              {/* Events */}
              <div className="space-y-10">
                {events.map((event, index) => {
                  const isLeft = index % 2 === 0;
                  const date = event.date || "TBA";
                  const venue = event.venue || "TBA";

                  return (
                    <div
                      key={event._id || index}
                      className={`flex items-center ${isLeft ? "justify-start" : "justify-end"} relative`}
                    >
                      <div
                        className={`w-1/2 p-6 bg-card/50 backdrop-blur-md border border-primary/30 rounded-2xl shadow-lg transform transition hover:scale-105 ${
                          isLeft ? "ml-0 text-left" : "ml-auto text-right"
                        }`}
                      >
                        <p className="text-lg font-semibold text-muted-foreground">{date}</p>
                        <p className="text-xl font-bold text-foreground">{venue}</p>
                      </div>

                      <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full z-20 shadow-lg"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;
