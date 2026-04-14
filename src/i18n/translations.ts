export type Language = 'pt' | 'en' | 'fr';

export const translations = {
  pt: {
    nav: {
      researchUnits: 'Unidades de Investigação',
      laboratories: 'Laboratórios',
      services: 'Serviços',
      organization: 'Organização',
      team: 'Equipa',
    },
    hero: {
      title: 'Observatório das Ciências e do Pensamento Estratégico Africano',
      subtitle: 'Investigação e Pensamento Estratégico',
    },
    researchUnits: {
      sectionTitle: 'Unidades de Investigação',
      sectionSubtitle: 'Unidade de Investigação',
      units: [
        {
          title: 'Escola de Pensamento Político Africano e Governo',
          description: 'School of African Political Thought and Government',
          details: `A Escola de Pensamento Político Africano e Governo dedica-se ao estudo e avanço da filosofia política africana, sistemas de governação e desenvolvimento de políticas. A nossa investigação foca-se em:
    • Sistemas políticos africanos tradicionais
    • Governação africana contemporânea
    • Análise e desenvolvimento de políticas
    • Teoria e prática política
    • Liderança e administração pública`,
        },
        {
          title: 'Escola de Filosofia e Doutrinas',
          description: 'School of Philosophy and Doctrines',
          details: `A Escola de Filosofia e Doutrinas explora tradições filosóficas e desenvolvimentos doutrinários em toda África. As áreas-chave incluem:
    • Tradições filosóficas africanas
    • Filosofia comparada
    • Ética e filosofia moral
    • Doutrinas religiosas e culturais
    • Debates filosóficos contemporâneos`,
        },
        {
          title: 'Escola de Direito e Jurisprudência',
          description: 'School of Law and Jurisprudence',
          details: `A Escola de Direito e Jurisprudência foca-se nos sistemas jurídicos e no pensamento judicial em África. As áreas de investigação incluem:
    • Sistemas jurídicos africanos
    • Direito internacional
    • Direitos humanos
    • Direito constitucional
    • Filosofia e teoria jurídica`,
        },
        {
          title: 'Centro de Relações Externas, Segurança e Defesa',
          description: 'Center of Foreign Relations, Security and Defense',
          details: `O Centro foca-se nas relações internacionais, estudos de segurança e estratégias de defesa. As áreas-chave incluem:
    • Diplomacia internacional
    • Segurança regional
    • Política de defesa
    • Resolução de conflitos
    • Estudos de paz e segurança`,
        },
        {
          title: 'Escola Interdisciplinar',
          description: 'Interdisciplinary School',
          details: `A Escola Interdisciplinar promove a investigação e colaboração entre disciplinas. As áreas de foco incluem:
    • Estudos interculturais
    • Métodos de investigação integrados
    • Projetos multidisciplinares
    • Inovação e desenvolvimento
    • Iniciativas de investigação colaborativa`,
        },
        {
          title: 'Instituto de Estado e Sociedade Civil',
          description: 'Institute of State and Civil Society',
          details: `O Instituto estuda a relação entre as instituições do Estado e a sociedade civil. As áreas de investigação incluem:
    • Organizações da sociedade civil
    • Políticas públicas
    • Estruturas de governação
    • Movimentos sociais
    • Instituições democráticas`,
        },
        {
          title: 'Escola de Educação e Cultura',
          description: 'School of Education and Culture',
          details: `A Escola de Educação e Cultura foca-se no desenvolvimento educacional e nos estudos culturais. As áreas-chave incluem:
    • Sistemas educacionais
    • Preservação cultural
    • Metodologias de ensino
    • Património cultural
    • Política educacional`,
        },
        {
          title: 'Instituto de Economia, Tecnologia e Meio Ambiente',
          description: 'Institute of Economic, Technology and Natural Environment',
          details: `O Instituto investiga o desenvolvimento económico, o avanço tecnológico e a sustentabilidade ambiental. As áreas de foco incluem:
    • Desenvolvimento sustentável
    • Proteção ambiental
    • Política económica
    • Inovação tecnológica
    • Gestão de recursos naturais`,
        },
        {
          title: 'Centro de Linguística e Comunicação Estratégica',
          description: 'Center of Linguistics and Strategic Communication',
          details: `O Centro estuda a linguagem, a comunicação e a mensagem estratégica. As áreas de investigação incluem:
    • Preservação da língua
    • Estratégias de comunicação
    • Estudos dos média
    • Linguística cultural
    • Mensagem estratégica`,
        },
      ],
    },
    laboratories: {
      sectionTitle: 'Laboratórios e Observatórios',
      sectionSubtitle: 'Laboratórios e Observatórios Científicos',
      labs: [
        { title: 'Laboratório da África Ocidental', description: 'The West African Laboratory' },
        { title: 'Laboratório da África Central e Oriental', description: 'East and Central African Laboratory' },
        { title: 'Laboratório do Norte de África', description: 'The North African Laboratory' },
        { title: 'Laboratório Sul Africano', description: 'South African Laboratory' },
        { title: 'Laboratório da Ásia, Médio Oriente, América e Europa', description: 'The Asian, Middle East, American and European Laboratory' },
        { title: 'Observatório Bissau-Guineense', description: 'Bissau-Guinean Observatory' },
      ],
    },
    services: {
      sectionTitle: 'Serviços',
      sectionSubtitle: 'Serviços',
      items: [
        {
          title: 'Consultoria',
          description: 'Consultancy',
          details: `Os nossos serviços de consultoria fornecem orientação e soluções especializadas em:
    • Desenvolvimento e análise de políticas
    • Planeamento estratégico
    • Metodologia de investigação
    • Avaliação de programas
    • Desenvolvimento institucional
    • Reforço de capacidades

    Trabalhamos com governos, organizações e instituições em toda África para fornecer soluções à medida e aconselhamento especializado.`,
        },
        {
          title: 'Projetos de Investigação e Publicações',
          description: 'Research Project and Publications',
          details: `Conduzimos e publicamos investigação de alta qualidade através de:
    • Revistas e publicações académicas
    • Relatórios de investigação e documentos de política
    • Livros e monografias
    • Documentos de trabalho
    • Projetos de investigação colaborativa

    As nossas publicações contribuem para o conhecimento académico e informam decisões políticas em toda África.`,
        },
        {
          title: 'Conferências',
          description: 'Conferences',
          details: `Organizamos e acolhemos vários eventos académicos e profissionais, incluindo:
    • Conferências internacionais
    • Simpósios académicos
    • Séries de workshops
    • Painéis de especialistas
    • Palestras públicas

    Estes eventos facilitam a troca de conhecimentos e a criação de redes entre académicos, profissionais e decisores políticos.`,
        },
        {
          title: 'Formação',
          description: 'Teaching',
          details: `Oferecemos programas educativos abrangentes, incluindo:
    • Cursos de desenvolvimento profissional
    • Programas de formação especializados
    • Workshops de metodologia de investigação
    • Desenvolvimento de liderança
    • Programas de certificação

    Os nossos programas de ensino são concebidos para reforçar capacidades e aprofundar a especialização em várias áreas.`,
        },
      ],
    },
    organization: {
      sectionTitle: 'Estrutura Organizacional',
      sectionSubtitle: 'Estrutura Organizacional',
      researchTeam: {
        title: 'Equipa de Investigação',
        items: [
          'Investigadores Doutorados',
          'Investigadores Associados',
          'Estágios',
          'Correspondentes',
        ],
      },
      organisation: {
        title: 'Organização',
        items: ['Direção', 'Assembleia Geral', 'Conselho Fiscal'],
      },
      councils: {
        title: 'Conselhos',
        items: [
          'Conselho Consultivo',
          'Conselho Científico',
          'Relações Institucionais e Protocolos',
        ],
      },
    },
    footer: {
      contact: 'Contacto',
      quickLinks: 'Links Rápidos',
      description: 'Centro Africano de Pesquisa e Pensamento Estratégico',
      rights: 'Todos os direitos reservados.',
    },
    team: {
      sectionTitle: 'Equipa',
      sectionSubtitle: 'Conheça os nossos membros',
    },
  },

  en: {
    nav: {
      researchUnits: 'Research Units',
      laboratories: 'Laboratories',
      services: 'Services',
      organization: 'Organization',
      team: 'Team',
    },
    hero: {
      title: 'African Centre for Research and Strategic Thinking',
      subtitle: 'Research And Strategic Thinking',
    },
    researchUnits: {
      sectionTitle: 'Research Units',
      sectionSubtitle: 'Research Units',
      units: [
        {
          title: 'School of African Political Thought and Government',
          description: 'Escola de Pensamento Político Africano e Governo',
          details: `The School of African Political Thought and Government is dedicated to studying and advancing African political philosophy, governance systems, and policy development. Our research focuses on:
    • Traditional African political systems
    • Contemporary African governance
    • Policy analysis and development
    • Political theory and practice
    • Leadership and public administration`,
        },
        {
          title: 'School of Philosophy and Doctrines',
          description: 'Escola de Filosofia e Doutrinas',
          details: `The School of Philosophy and Doctrines explores philosophical traditions and doctrinal developments across Africa. Key areas include:
    • African philosophical traditions
    • Comparative philosophy
    • Ethics and moral philosophy
    • Religious and cultural doctrines
    • Contemporary philosophical debates`,
        },
        {
          title: 'School of Law and Jurisprudence',
          description: 'Escola de Direito e Jurisprudência',
          details: `The School of Law and Jurisprudence focuses on legal systems and judicial thought in Africa. Research areas include:
    • African legal systems
    • International law
    • Human rights
    • Constitutional law
    • Legal philosophy and theory`,
        },
        {
          title: 'Center of Foreign Relations, Security and Defense',
          description: 'Centro das Relações Externas, Segurança e Defesa',
          details: `The Center focuses on international relations, security studies, and defense strategies. Key areas include:
    • International diplomacy
    • Regional security
    • Defense policy
    • Conflict resolution
    • Peace and security studies`,
        },
        {
          title: 'Interdisciplinary School',
          description: 'Escola interdisciplinar',
          details: `The Interdisciplinary School promotes cross-disciplinary research and collaboration. Focus areas include:
    • Cross-cultural studies
    • Integrated research methods
    • Multidisciplinary projects
    • Innovation and development
    • Collaborative research initiatives`,
        },
        {
          title: 'Institute of State and Civil Society',
          description: 'Instituto de Estado e Sociedade Civil',
          details: `The Institute studies the relationship between state institutions and civil society. Research areas include:
    • Civil society organizations
    • Public policy
    • Governance structures
    • Social movements
    • Democratic institutions`,
        },
        {
          title: 'School of Education and Culture',
          description: 'Escola de Educação e Cultura',
          details: `The School of Education and Culture focuses on educational development and cultural studies. Key areas include:
    • Educational systems
    • Cultural preservation
    • Teaching methodologies
    • Cultural heritage
    • Educational policy`,
        },
        {
          title: 'Institute of Economic, Technology and Natural Environment',
          description: 'Instituto de Economía, Tecnologia e Meio Ambiente',
          details: `The Institute researches economic development, technological advancement, and environmental sustainability. Focus areas include:
    • Sustainable development
    • Environmental protection
    • Economic policy
    • Technology innovation
    • Natural resource management`,
        },
        {
          title: 'Center of Linguistics and Strategic Communication',
          description: 'Centro Linguística e Comunicação Estratégica',
          details: `The Center studies language, communication, and strategic messaging. Research areas include:
    • Language preservation
    • Communication strategies
    • Media studies
    • Cultural linguistics
    • Strategic messaging`,
        },
      ],
    },
    laboratories: {
      sectionTitle: 'Laboratories and Observatories',
      sectionSubtitle: 'Scientific Laboratories and Observatories',
      labs: [
        { title: 'The West African Laboratory', description: 'Laboratório da África Ocidental' },
        { title: 'East and Central African Laboratory', description: 'Laboratório da África Central e Oriental' },
        { title: 'The North African Laboratory', description: 'Laboratório do Norte de África' },
        { title: 'South African Laboratory', description: 'Laboratório Sul Africano' },
        { title: 'The Asian, Middle East, American and European Laboratory', description: 'Laboratório da Ásia, Médio Oriente, América e Europa' },
        { title: 'Bissau-Guinean Observatory', description: 'Observatório Bissau-Guineense' },
      ],
    },
    services: {
      sectionTitle: 'Services',
      sectionSubtitle: 'Services',
      items: [
        {
          title: 'Consultancy',
          description: 'Consultoria',
          details: `Our consultancy services provide expert guidance and solutions in:
    • Policy development and analysis
    • Strategic planning
    • Research methodology
    • Program evaluation
    • Institutional development
    • Capacity building

    We work with governments, organizations, and institutions across Africa to provide tailored solutions and expert advice.`,
        },
        {
          title: 'Research Project and Publications',
          description: 'Publicações e Projetos de Investigação',
          details: `We conduct and publish high-quality research through:
    • Academic journals and publications
    • Research reports and policy papers
    • Books and monographs
    • Working papers
    • Collaborative research projects

    Our publications contribute to academic knowledge and inform policy decisions across Africa.`,
        },
        {
          title: 'Conferences',
          description: 'Conferências',
          details: `We organize and host various academic and professional events including:
    • International conferences
    • Academic symposiums
    • Workshop series
    • Expert panels
    • Public lectures

    These events facilitate knowledge exchange and networking among scholars, practitioners, and policymakers.`,
        },
        {
          title: 'Teaching',
          description: 'Formação',
          details: `We offer comprehensive educational programs including:
    • Professional development courses
    • Specialized training programs
    • Research methodology workshops
    • Leadership development
    • Certificate programs

    Our teaching programs are designed to build capacity and enhance expertise in various fields.`,
        },
      ],
    },
    organization: {
      sectionTitle: 'Organization Structure',
      sectionSubtitle: 'Organizational Structure',
      researchTeam: {
        title: 'Research Team',
        items: [
          'Doctorate Researchers',
          'Associate Researchers',
          'Internship',
          'Correspondent',
        ],
      },
      organisation: {
        title: 'Organisation',
        items: ['Board of Directors', 'General Assembly', 'Fiscal Council'],
      },
      councils: {
        title: 'Councils',
        items: [
          'Advisory Council',
          'Scientific Council',
          'Institutional Relations and Protocols',
        ],
      },
    },
    footer: {
      contact: 'Contact',
      quickLinks: 'Quick Links',
      description: 'African Centre for Research and Strategic Thinking',
      rights: 'All rights reserved.',
    },
    team: {
      sectionTitle: 'Team',
      sectionSubtitle: 'Meet our team members',
    },
  },

  fr: {
    nav: {
      researchUnits: "Unités de Recherche",
      laboratories: 'Laboratoires',
      services: 'Services',
      organization: 'Organisation',
      team: 'Équipe',
    },
    hero: {
      title: 'Centre Africain de Recherche et de Pensée Stratégique',
      subtitle: 'Recherche et Pensée Stratégique',
    },
    researchUnits: {
      sectionTitle: 'Unités de Recherche',
      sectionSubtitle: 'Unités de Recherche',
      units: [
        {
          title: 'École de Pensée Politique Africaine et de Gouvernement',
          description: 'School of African Political Thought and Government',
          details: `L'École de Pensée Politique Africaine et de Gouvernement est dédiée à l'étude et à l'avancement de la philosophie politique africaine, des systèmes de gouvernance et du développement des politiques. Notre recherche se concentre sur:
    • Les systèmes politiques africains traditionnels
    • La gouvernance africaine contemporaine
    • L'analyse et le développement des politiques
    • La théorie et la pratique politiques
    • Le leadership et l'administration publique`,
        },
        {
          title: 'École de Philosophie et de Doctrines',
          description: 'School of Philosophy and Doctrines',
          details: `L'École de Philosophie et de Doctrines explore les traditions philosophiques et les développements doctrinaux à travers l'Afrique. Les domaines clés comprennent:
    • Les traditions philosophiques africaines
    • La philosophie comparée
    • L'éthique et la philosophie morale
    • Les doctrines religieuses et culturelles
    • Les débats philosophiques contemporains`,
        },
        {
          title: 'École de Droit et de Jurisprudence',
          description: 'School of Law and Jurisprudence',
          details: `L'École de Droit et de Jurisprudence se concentre sur les systèmes juridiques et la pensée judiciaire en Afrique. Les domaines de recherche comprennent:
    • Les systèmes juridiques africains
    • Le droit international
    • Les droits de l'homme
    • Le droit constitutionnel
    • La philosophie et la théorie juridiques`,
        },
        {
          title: 'Centre des Relations Extérieures, Sécurité et Défense',
          description: 'Center of Foreign Relations, Security and Defense',
          details: `Le Centre se concentre sur les relations internationales, les études de sécurité et les stratégies de défense. Les domaines clés comprennent:
    • La diplomatie internationale
    • La sécurité régionale
    • La politique de défense
    • La résolution des conflits
    • Les études de paix et de sécurité`,
        },
        {
          title: 'École Interdisciplinaire',
          description: 'Interdisciplinary School',
          details: `L'École Interdisciplinaire promeut la recherche et la collaboration entre disciplines. Les domaines de focus comprennent:
    • Les études interculturelles
    • Les méthodes de recherche intégrées
    • Les projets multidisciplinaires
    • L'innovation et le développement
    • Les initiatives de recherche collaborative`,
        },
        {
          title: "Institut de l'État et de la Société Civile",
          description: 'Institute of State and Civil Society',
          details: `L'Institut étudie la relation entre les institutions étatiques et la société civile. Les domaines de recherche comprennent:
    • Les organisations de la société civile
    • Les politiques publiques
    • Les structures de gouvernance
    • Les mouvements sociaux
    • Les institutions démocratiques`,
        },
        {
          title: "École d'Éducation et de Culture",
          description: 'School of Education and Culture',
          details: `L'École d'Éducation et de Culture se concentre sur le développement éducatif et les études culturelles. Les domaines clés comprennent:
    • Les systèmes éducatifs
    • La préservation culturelle
    • Les méthodologies d'enseignement
    • Le patrimoine culturel
    • La politique éducative`,
        },
        {
          title: "Institut d'Économie, de Technologie et d'Environnement Naturel",
          description: 'Institute of Economic, Technology and Natural Environment',
          details: `L'Institut recherche le développement économique, l'avancement technologique et la durabilité environnementale. Les domaines de focus comprennent:
    • Le développement durable
    • La protection de l'environnement
    • La politique économique
    • L'innovation technologique
    • La gestion des ressources naturelles`,
        },
        {
          title: 'Centre de Linguistique et de Communication Stratégique',
          description: 'Center of Linguistics and Strategic Communication',
          details: `Le Centre étudie le langage, la communication et la messagerie stratégique. Les domaines de recherche comprennent:
    • La préservation des langues
    • Les stratégies de communication
    • Les études médiatiques
    • La linguistique culturelle
    • La messagerie stratégique`,
        },
      ],
    },
    laboratories: {
      sectionTitle: 'Laboratoires et Observatoires',
      sectionSubtitle: 'Laboratoires et Observatoires Scientifiques',
      labs: [
        { title: "Laboratoire de l'Afrique de l'Ouest", description: 'The West African Laboratory' },
        { title: "Laboratoire de l'Afrique Centrale et Orientale", description: 'East and Central African Laboratory' },
        { title: "Laboratoire de l'Afrique du Nord", description: 'The North African Laboratory' },
        { title: "Laboratoire de l'Afrique du Sud", description: 'South African Laboratory' },
        { title: "Laboratoire de l'Asie, du Moyen-Orient, de l'Amérique et de l'Europe", description: 'The Asian, Middle East, American and European Laboratory' },
        { title: 'Observatoire Bissau-Guinéen', description: 'Bissau-Guinean Observatory' },
      ],
    },
    services: {
      sectionTitle: 'Services',
      sectionSubtitle: 'Services',
      items: [
        {
          title: 'Conseil',
          description: 'Consultancy',
          details: `Nos services de conseil fournissent des orientations et des solutions expertes dans:
    • Le développement et l'analyse des politiques
    • La planification stratégique
    • La méthodologie de recherche
    • L'évaluation des programmes
    • Le développement institutionnel
    • Le renforcement des capacités

    Nous travaillons avec des gouvernements, des organisations et des institutions à travers l'Afrique pour fournir des solutions sur mesure et des conseils d'experts.`,
        },
        {
          title: 'Projets de Recherche et Publications',
          description: 'Research Project and Publications',
          details: `Nous conduisons et publions des recherches de haute qualité à travers:
    • Des revues et publications académiques
    • Des rapports de recherche et documents de politique
    • Des livres et monographies
    • Des documents de travail
    • Des projets de recherche collaborative

    Nos publications contribuent au savoir académique et informent les décisions politiques à travers l'Afrique.`,
        },
        {
          title: 'Conférences',
          description: 'Conferences',
          details: `Nous organisons et accueillons divers événements académiques et professionnels, notamment:
    • Des conférences internationales
    • Des symposiums académiques
    • Des séries d'ateliers
    • Des panels d'experts
    • Des conférences publiques

    Ces événements facilitent l'échange de connaissances et le réseautage entre chercheurs, praticiens et décideurs.`,
        },
        {
          title: 'Formation',
          description: 'Teaching',
          details: `Nous offrons des programmes éducatifs complets, notamment:
    • Des cours de développement professionnel
    • Des programmes de formation spécialisés
    • Des ateliers de méthodologie de recherche
    • Le développement du leadership
    • Des programmes de certification

    Nos programmes d'enseignement sont conçus pour renforcer les capacités et approfondir l'expertise dans divers domaines.`,
        },
      ],
    },
    organization: {
      sectionTitle: "Structure de l'Organisation",
      sectionSubtitle: 'Structure Organisationnelle',
      researchTeam: {
        title: 'Équipe de Recherche',
        items: [
          'Chercheurs Docteurs',
          'Chercheurs Associés',
          'Stage',
          'Correspondants',
        ],
      },
      organisation: {
        title: 'Organisation',
        items: ["Conseil d'Administration", 'Assemblée Générale', 'Conseil Fiscal'],
      },
      councils: {
        title: 'Conseils',
        items: [
          'Conseil Consultatif',
          'Conseil Scientifique',
          'Relations Institutionnelles et Protocoles',
        ],
      },
    },
    footer: {
      contact: 'Contact',
      quickLinks: 'Liens Rapides',
      description: 'Centre Africain de Recherche et de Pensée Stratégique',
      rights: 'Tous droits réservés.',
    },
    team: {
      sectionTitle: 'Équipe',
      sectionSubtitle: 'Rencontrez nos membres',
    },
  },
};

export type Translations = typeof translations.pt;
