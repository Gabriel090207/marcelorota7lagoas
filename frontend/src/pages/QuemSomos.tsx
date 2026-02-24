import './QuemSomos.css'
import { SectionDivider } from '../components/SectionDivider/SectionDivider'


export default function QuemSomos() {
  return (
    <main className="quemSomos">

     <section className="quemSomos__hero">
  <div className="quemSomos__container">

    <span className="quemSomos__label">
      QUEM SOMOS
    </span>

    <h1>
      O portal que fortalece o motociclismo
      de Sete Lagoas e região.
    </h1>

    <p>
      O Rota 7 Lagoas nasceu com o propósito de unir moto clubes,
      motociclistas independentes e empresas do setor, valorizando
      a cultura biker e fortalecendo a comunidade regional.
    </p>

  </div>
</section>

      
           <SectionDivider />

      <section className="quemSomos__content">
  <div className="quemSomos__container">

    <h2>Nossa História</h2>

    <p>
      O motociclismo vai muito além de duas rodas. Ele representa liberdade,
      irmandade, respeito, superação e a paixão pela estrada. Em Sete Lagoas
      e região, essa cultura sempre esteve presente através de moto clubes,
      grupos independentes e motociclistas que transformam cada viagem em
      uma experiência única.
    </p>

    <p>
      O Rota 7 Lagoas nasceu da necessidade de criar um ponto de encontro
      digital para essa comunidade. Um espaço onde eventos ganham visibilidade,
      empresas locais são valorizadas e histórias inspiradoras encontram voz.
      Mais do que um portal, somos um elo entre pessoas que compartilham
      o mesmo estilo de vida.
    </p>

    <p>
      Nosso compromisso é fortalecer o motociclismo regional, incentivar
      a pilotagem consciente e contribuir para o crescimento do setor
      comercial ligado às motos em Sete Lagoas e entorno.
    </p>


    <h2>Missão</h2>

    <p>
      Ser o principal canal de informação e conexão da comunidade
      motociclística regional, promovendo eventos, negócios locais,
      conhecimento técnico e a cultura biker com credibilidade
      e responsabilidade.
    </p>


    <h2>Visão</h2>

    <p>
      Tornar-se o maior portal digital dedicado ao motociclismo
      no interior de Minas Gerais, sendo referência em conteúdo,
      organização de eventos e fortalecimento da economia local
      ligada ao segmento.
    </p>


    <h2>Valores</h2>

    <ul>
      <li><strong>Irmandade:</strong> Acreditamos no espírito de união que move a comunidade biker.</li>
      <li><strong>Respeito:</strong> Valorizamos a diversidade de estilos, cilindradas e trajetórias.</li>
      <li><strong>Credibilidade:</strong> Informações claras, responsáveis e bem apuradas.</li>
      <li><strong>Segurança:</strong> Incentivo constante à pilotagem consciente e preventiva.</li>
      <li><strong>Valorização Local:</strong> Apoio às empresas, oficinas, lojas e profissionais da região.</li>
      <li><strong>Paixão pela Estrada:</strong> Porque a estrada não é só destino, é propósito.</li>
    </ul>


    <h2>O Que Acreditamos</h2>

    <p>
      Acreditamos que o motociclismo transforma pessoas. Ele cria histórias,
      constrói amizades e movimenta economias locais. Cada encontro,
      cada passeio e cada trilha representam mais do que um evento:
      representam conexão.
    </p>

    <p>
      O Rota 7 Lagoas existe para registrar, divulgar e fortalecer
      essa conexão — dando visibilidade ao que acontece nas ruas,
      nas estradas e nas trilhas da nossa região.
    </p>

  </div>
</section>


      <SectionDivider />

{/* FUNDADORES */}
<section className="quemSomos__founders">
  <div className="quemSomos__container">

    <span className="quemSomos__label">
      Fundadores
    </span>

    <h2>Quem está por trás da Rota 7</h2>

    <p className="foundersIntro">
      O Rota 7 Lagoas é construído por apaixonados por motociclismo,
      comprometidos em fortalecer a comunidade regional e valorizar
      a cultura biker.
    </p>

    <div className="foundersGrid">

      <div className="founderCard">
        <div className="founderCard__image" />
        <h3>Seu Nome Aqui</h3>
        <span>Fundador & Idealizador</span>
        <p>
          Motociclista apaixonado, empreendedor e entusiasta da cultura
          biker regional. Idealizador do portal Rota 7 Lagoas com o objetivo
          de conectar pessoas, eventos e negócios do setor.
        </p>
      </div>

      <div className="founderCard">
        <div className="founderCard__image" />
        <h3>Nome do Parceiro</h3>
        <span>Co-Fundador</span>
        <p>
          Responsável pela estratégia, comunicação e expansão do projeto,
          buscando fortalecer o motociclismo em Sete Lagoas e região.
        </p>
      </div>

    </div>

  </div>
</section>


     <section className="eventos__cta">
  <div className="eventos__ctaInner">

    <div className="cta__content">
      <span className="cta__label">Comunidade Rota 7</span>

      <h2>Quer fazer parte da Rota 7 Lagoas?</h2>

      <p>
        Seja você um moto clube, empresa ou motociclista independente,
        o portal está aberto para fortalecer sua marca e sua história.
      </p>

      <div className="cta__actions">
        <a
          href="https://wa.me/5500000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          Falar no WhatsApp
        </a>

      
      </div>
    </div>

  </div>
</section>

    </main>
  )
}