import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');
  
  const getMonth = (date: Date) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[date.getMonth()];
  };
  
  const getDayOfWeek = (date: Date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  };

  const getPeriod = (date: Date) => {
    return date.getHours() >= 12 ? 'PM' : 'AM';
  };

  const getRotation = (unit: string) => {
    switch (unit) {
      case 'seconds':
        return time.getSeconds() * 6
      case 'minutes':
        return time.getMinutes() * 6 + time.getSeconds() * 0.1
      case 'hours':
        return (time.getHours() % 12) * 30 + time.getMinutes() * 0.5 + time.getSeconds() * (0.5 / 60);
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700 max-w-md w-full transform hover:scale-105 transition-all duration-300">
        {/* Year Display */}
        <div className="text-center mb-6">
          <div className="bg-gray-900 rounded-lg p-4 shadow-inner">
            <span className="text-4xl font-bold text-gray-100 tracking-wider">
              {time.getFullYear()}
            </span>
          </div>
        </div>

        {/* Month and Day Row */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-gray-900 rounded-lg p-4 shadow-inner">
            <span className="text-2xl font-bold text-gray-100 tracking-wider block text-center">
              {getMonth(time)}
            </span>
          </div>
          <div className="w-16 bg-gray-900 rounded-lg p-4 shadow-inner flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-100">
              {time.getDate()}
            </span>
          </div>
        </div>

        {/* Clock and Day Row */}
        <div className="flex gap-4 items-center">
          {/* Analog Clock */}
          <div className="flex-1">
            <div className="relative w-24 h-24 bg-gray-900 rounded-full shadow-inner flex items-center justify-center border-2 border-gray-700">
              {/* Clock Marks */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-2 bg-gray-400"
                  style={{
                    top: '46%',
                    left: '49%',
                    transform: `rotate(${i * 30}deg) translate(-50%, -40px)`,
                    transformOrigin: 'center',
                  }}
                />
              ))}
              
              {/* Center Dot */}
              <div className="absolute w-2 h-2 bg-gray-100 rounded-full z-30"></div>
              
              {/* Hour Hand */}
              <div
                className="absolute bg-gray-100 z-20 rounded-full transition-transform duration-1000 ease-out"
                style={{
                  width: '2px',
                  height: '20px',
                  transform: `rotate(${getRotation('hours')}deg)`,
                  transformOrigin: 'bottom center',
                  top: 'calc(50% - 20px)',
                  left: 'calc(50% - 1px)',
                  willChange: 'transform',
                }}
              />

              {/* Minute Hand */}
              <div
                className="absolute bg-gray-100 z-20 rounded-full transition-transform duration-1000 ease-out"
                style={{
                  width: '2px',
                  height: '28px',
                  transform: `rotate(${getRotation('minutes')}deg)`,
                  transformOrigin: 'bottom center',
                  top: 'calc(50% - 28px)',
                  left: 'calc(50% - 1px)',
                  willChange: 'transform',
                }}
              />

              {/* Second Hand */}
              <div
                className="absolute bg-red-500 z-10 transition-transform duration-75 ease-out"
                style={{
                  width: '1px',
                  height: '32px',
                  transform: `rotate(${getRotation('seconds')}deg)`,
                  transformOrigin: 'bottom center',
                  top: 'calc(50% - 32px)',
                  left: 'calc(50% - 0.5px)',
                  willChange: 'transform',
                }}
              />

            </div>
          </div>

          {/* Day of Week */}
          <div className="flex-1">
            <div className="bg-red-600 rounded-lg p-4 shadow-lg transform hover:bg-red-500 transition-colors duration-300">
              <div className="text-center">
                <span className="text-xl font-bold text-white block">
                  {getDayOfWeek(time)}
                </span>
                <span className="text-sm font-medium text-red-100">
                  {getPeriod(time)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Time Display */}
        <div className="mt-6 text-center">
          <div className="bg-gray-900 rounded-lg p-3 shadow-inner">
            <span className="text-lg font-mono text-gray-100 tracking-wider">
              {formatTwoDigits(time.getHours())}:
              {formatTwoDigits(time.getMinutes())}:
              {formatTwoDigits(time.getSeconds())}
            </span>
          </div>
        </div>

        {/* Subtle Brand */}
        <div className="mt-4 text-center opacity-50">
          <Clock size={16} className="inline text-gray-400" />
          <span className="text-xs text-gray-400 ml-1 font-light">
            Developed by PeCosta23
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;