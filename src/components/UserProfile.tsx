import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState<{ name: string; picture: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.name,
        picture: parsedUser.picture , // Usa avatar por defecto si no hay picture
      });
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center justify-end space-x-2 text-white border border-red-500">
      <span className="text-sm font-medium hidden md:inline">{user.name}</span>
      <img
        src={user.picture || '/images/default-avatar.png'}
        alt="Foto de perfil"
        className="w-8 h-8 rounded-full object-cover border-2 border-white"
        onError={e => (e.currentTarget.src = '/images/default-avatar.png')}
      />
    </div>
  );
};

export default UserProfile;