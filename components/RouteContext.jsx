import { createContext, useContext, useState } from 'react';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState('dashboard'); // 'dashboard' | 'calendar' | 'kanban' | 'analytics' | 'tickets'

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
