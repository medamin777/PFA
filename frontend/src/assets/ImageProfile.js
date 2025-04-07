import defaultProfileImage from '../assets/default.jpg';
const getImageSrc = (profilePicture) => {
   
    if (!profilePicture) return defaultProfileImage;
    return `http://localhost:4004${profilePicture}`;
  };

  export default getImageSrc;