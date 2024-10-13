import React from 'react';

const Header = ({ isAdmin, notificationsCount, user }) => {
  return (
    <header>
      <div>
        <img src="logo2.png" alt="Logo" style={{ width: '10%', boxShadow: '1px 1px 5px black' }} />
        <img src="banner3.bmp" alt="Banner" style={{ width: '60%', boxShadow: '1px 1px 5px black', marginLeft: '50px' }} />
      </div>
      <br />
      <nav>
        <a href="/"><button style={{ width: '85px', backgroundImage: 'url(dd0.png)' }}>Accueil</button></a>
        <a href="/demander"><button style={{ width: '170px', backgroundImage: 'url(dd.png)' }}>Demander un congé</button></a>
        <a href="/mes-demandes"><button style={{ width: '140px', backgroundImage: 'url(dd2.png)' }}>Mes demandes</button></a>

        {isAdmin && (
          <>
            <a href="/liste-demandes"><button style={{ backgroundImage: 'url(dd6.png)' }}>Liste des demandes</button></a>
            <a href="/liste-personnels"><button style={{ backgroundImage: 'url(dd4.png)' }}>Liste des personnels</button></a>
            <a href="/inscription"><button style={{ backgroundImage: 'url(dd5.png)' }}>Ajouter un personnel</button></a>
          </>
        )}
        <a href="/deconnexion"><button style={{ width: '85px', backgroundImage: 'url(deconect.png)' }}>Quitter</button></a>
      </nav>

      {isAdmin && (
        <div className="notifdiv">
          <img src="notif.png" alt="Notifications" />
          <p>
            Bonjour <i><b>{user.nom} {user.prenom}</b></i>, Vous avez <span><b>{notificationsCount}</b></span>
            <a className="notif" href="/liste-demandes?enAttente=1">Demande(s) en attente</a>
          </p>
        </div>
      )}
      <hr />
    </header>
  );
};

export default Header;
