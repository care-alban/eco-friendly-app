import styled from 'styled-components';

export default function Banner() {
  return (
    <BannerStyled>
      <p>
        Ce site est un travail de fin de formation, il est destiné à la
        démonstration des compétences acquises et n'a pas vocation politique,
        commerciale ou autre. Il ne sera pas mis à jour et son contenu ne sera
        pas modifié.
      </p>
    </BannerStyled>
  );
}

const BannerStyled = styled.div`
  max-width: 100%;
  background-color: #f5f5f5;
  padding: 0.375rem auto;
  font-size: 0.8rem;
  line-height: 1;
  color: #333;
  text-align: center;
`;
