import React from "react";

interface ProfileProps {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  website?: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, bio, avatar, website }) => {
  return (
    <div className="profile">
      {avatar && (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="profile__avatar"
        />
      )}
      <h1 className="profile__name">{name}</h1>
      <p className="profile__email">{email}</p>
      {website && (
        <p className="profile__website">
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </p>
      )}
      {bio && <p className="profile__bio">{bio}</p>}
    </div>
  );
};

export default Profile;
