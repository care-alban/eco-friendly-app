import { Link as RouterLink } from 'react-router-dom';
import { Container, Link, Typography } from '@mui/material';

import Layout from '../components/Layout';

export default function LegalNoticePage() {
  return (
    <Layout>
      <Container maxWidth="md">
        <section className="legal-notice-page">
          <Typography variant="h3" component="h1">
            Mentions légales
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Les présentes conditions générales fixent les modalités
            d’utilisation du service web{' '}
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="secondary"
            >
              https://eco-friendly.fr
            </Link>
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            L’utilisateur reconnait avoir pris connaissance de ce document et
            accepté l’ensemble de ces informations, que cet usage soit fait à
            titre personnel ou professionnel. Si cet usage est fait à titre
            professionnel, l’utilisateur garantit détenir les pouvoirs
            nécessaires pour accepter ces conditions générales au sein de son
            organisation.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Éditeur et responsable de publication
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Ce site personnel non déclaré à la CNIL est édité comme projet de
            fin d'étude par
            <strong> Laure Riglet et Alban Caré</strong> pour la formation
            o'clock et la préparation du Titre Professionnel de "Développeur Web
            et Web Mobile".
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Hébergement
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Ce site est hébergé par OVH.com
            <br />
            Siège social : 2 rue Kellermann – 59100 Roubaix – France.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Cet hébergeur détient à ce jour les informations personnelles
            concernant l’auteur de ce site.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Publicité et affiliation
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Eco-Friendly est un site autofinancé, l’hébergement du site est
            réalisé sur des fonds personnels.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            A ce jour aucun contenu du site ne possèdent des liens d’affiliation
            envers des sites d'E-commerce. Et il n'en aura jamais.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Enfin, si certains articles publiés sur d'autres sites sont utilisés
            à des fins collaboratives et pédagogiques; ils possèderont la
            mention "Article Lié" qui renverra sur l'article source, aucun de
            ces liens ne sera sponsorisés
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Responsabilité
          </Typography>
          <Typography variant="body2" component="em" mb={2} textAlign="justify">
            L'information est fournie à titre indicatif, car il n'est pas prévu
            de publier de contenu réél sur ce site.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            L’éditeur du site met à disposition un large contenu d’informations
            gratuit. Il s’assure en permanence de mettre les moyens à sa
            disposition pour s’assurer de la qualité de ces contenus. Toutes les
            informations indiquées sur le site sont données à titre indicatif,
            et sont susceptibles d’évoluer. Par ailleurs, les informations
            contenues sur le site ne sont pas exhaustives. Elles sont données
            sous réserve de modifications ayant été apportées depuis leur mise
            en ligne.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Il advient à l’utilisateur de s’assurer de la pertinence de ces
            informations au regard de sa situation. L’utilisateur s’engage donc
            à utiliser ces informations sous son entière responsabilité et
            dégage l’éditeur de toute responsabilité à cet égard.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Par ailleurs, chaque utilisation de contenu tiers est mentionné dans
            l'article concerné et cette transparence sera également appliquée
            sur les réseaux sociaux.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Limitations contractuelles sur les données techniques.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Le site utilise la technologie JavaScript. Le site Internet ne
            pourra être tenu responsable de dommages matériels liés à
            l’utilisation du site.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            L’utilisateur du site s’engage à accéder au site en utilisant un
            matériel récent, ne contenant pas de virus et avec un navigateur de
            dernière génération mis-à-jour.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Propriété intellectuelle et contrefaçons.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Eco-Friendly est une marque déposée. Toute reproduction totale ou
            partielle du site{' '}
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="secondary"
            >
              https://eco-friendly.fr
            </Link>{' '}
            est strictement interdite.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            L’utilisateur s’interdit de reproduire, copier, publier,
            télécharger, dénaturer, transmettre, distribuer, vendre, échanger ou
            exploiter pour quelque motif que ce soit, tout ou partie du site,
            des informations qui y sont contenues, des logiciels qui y sont
            utilisés, sans l’autorisation expresse et préalable de l’éditeur.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Toute utilisation non autorisée du site ou de l’un quelconque des
            éléments qu’il contient sera considérée comme constitutive d’une
            contrefaçon et poursuivie conformément aux dispositions des articles
            L.335-2 et suivants du Code de Propriété Intellectuelle.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Les marques et logos reproduits sur le site sont déposés par les
            sociétés qui en sont propriétaires.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Responsabilité dans l’utilisation du service
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            L’utilisateur s’engage à ne pas perturber le fonctionnement du
            service offert de quelque manière que ce soit. En particulier,
            l’utilisateur s’engage à s’abstenir de poster des messages
            illicites, diffamants ou insultants sur tout ou partie du site. Les
            commentaires déposés par les internautes reflètent exclusivement
            l’avis de leurs auteurs et demeurent sous leur responsabilité. En
            écrivant des commentaires sur le site, l’internaute accepte de se
            soumettre aux lois françaises et internationales.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Tout commentaire à caractère injurieux, diffamatoire, xénophobe,
            raciste, pornographique, pédophile, etc. sera supprimé sans préavis.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            L’éditeur du site se réserve le droit de supprimer, sans mise en
            demeure préalable, tout contenu déposé dans l’espace de commentaires
            qui contreviendrait à la législation applicable en France, en
            particulier aux dispositions relatives à la protection des données.
            L’utilisateur est le seul responsable des commentaires qu’il dépose.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            L’éditeur du site se réserve également le droit de mettre en cause
            la responsabilité civile et/ou pénale de l’utilisateur, notamment en
            cas de message à caractère raciste, injurieux, diffamant, ou
            pornographique, quel que soit le support utilisé (texte,
            photographie…).
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Liens hypertextes et cookies.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Le site <span className="legal-link">https://eco-friendly.fr</span>{' '}
            pourra contenir un certain nombre de liens hypertextes vers d’autres
            sites, mis en place avec l’autorisation de l’éditeur du site.
            Cependant, l’éditeur du site n’a pas la possibilité de vérifier le
            contenu des sites ainsi visités, et n’assumera en conséquence aucune
            responsabilité de ce fait.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Dans le cadre de l'étude, la navigation sur le site{' '}
            <span className="legal-link">https://eco-friendly.fr</span> pourrait
            être susceptible de provoquer l’installation de cookie(s) sur
            l’ordinateur de l’utilisateur. Un cookie est un fichier de petite
            taille, qui ne permet pas l’identification de l’utilisateur, mais
            qui enregistre des informations relatives à la navigation d’un
            ordinateur sur un site. Les données ainsi obtenues visent à
            faciliter la navigation ultérieure sur le site, et ont également
            vocation à permettre diverses mesures de fréquentation.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Le refus d’installation d’un cookie pourra entraîner l’impossibilité
            d’accéder à certains services. L’utilisateur peut toutefois
            configurer son ordinateur de la manière suivante, pour refuser
            l’installation des cookies : Sous Internet Explorer : onglet outil
            (pictogramme en forme de rouage en haut à droite) / options
            internet. Cliquez sur Confidentialité et choisissez Bloquer tous les
            cookies. Validez sur Ok. Sous Firefox : en haut de la fenêtre du
            navigateur, cliquez sur le bouton Firefox, puis aller dans l’onglet
            Options. Cliquer sur l’onglet Vie privée. Paramétrez les Règles de
            conservation sur : utiliser les paramètres personnalisés pour
            l’historique. Enfin décochez-la pour désactiver les cookies. Sous
            Safari : Cliquez en haut à droite du navigateur sur le pictogramme
            de menu (symbolisé par un rouage). Sélectionnez Paramètres. Cliquez
            sur Afficher les paramètres avancés. Dans la section «
            Confidentialité », cliquez sur Paramètres de contenu. Dans la
            section « Cookies », vous pouvez bloquer les cookies. Sous Chrome :
            Cliquez en haut à droite du navigateur sur le pictogramme de menu
            (symbolisé par trois lignes horizontales). Sélectionnez Paramètres.
            Cliquez sur Afficher les paramètres avancés. Dans la section «
            Confidentialité », cliquez sur préférences. Dans l’onglet «
            Confidentialité », vous pouvez bloquer les cookies.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Droit applicable et attribution de juridiction.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Tout litige en relation avec l’utilisation du site{' '}
            <span className="legal-link">https://eco-friendly.fr</span> est
            soumis au droit français. Il est fait attribution exclusive de
            juridiction aux tribunaux compétents de Paris.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Les principales lois concernées.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Loi n° 78-17 du 6 janvier 1978, notamment modifiée par la loi n°
            2004-801 du 6 août 2004 relative à l’informatique, aux fichiers et
            aux libertés.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie
            numérique.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            borderBottom={1}
            borderColor="divider"
            mb={2}
          >
            Lexique.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Utilisateur : Internaute se connectant, utilisant le site susnommé.
          </Typography>
          <Typography variant="body2" component="p" mb={2} textAlign="justify">
            Informations personnelles : « les informations qui permettent, sous
            quelque forme que ce soit, directement ou non, l’identification des
            personnes physiques auxquelles elles s’appliquent » (article 4 de la
            loi n° 78-17 du 6 janvier 1978).
          </Typography>
        </section>
      </Container>
    </Layout>
  );
}
