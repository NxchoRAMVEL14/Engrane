// ENGRANE · apodos automáticos (de mecatrónica, nunca agresivos)
(function () {
  const ENG = window.ENG;
  // [sustantivo, género]
  const NOMBRES = [
    ['Engrane', 'm'], ['Pistón', 'm'], ['Servo', 'm'], ['Tornillo', 'm'], ['Resorte', 'm'], ['Rodamiento', 'm'],
    ['Motor', 'm'], ['Sensor', 'm'], ['Cilindro', 'm'], ['Actuador', 'm'], ['Circuito', 'm'], ['Piñón', 'm'],
    ['Rotor', 'm'], ['Encoder', 'm'], ['Robot', 'm'], ['Brazo', 'm'], ['Diodo', 'm'], ['Relevador', 'm'],
    ['Vernier', 'm'], ['Compresor', 'm'], ['Transistor', 'm'], ['Capacitor', 'm'], ['Imán', 'm'], ['Balero', 'm'],
    ['Volante', 'm'], ['Chip', 'm'], ['Láser', 'm'], ['Torno', 'm'], ['Eje', 'm'], ['Manómetro', 'm'],
    ['Polea', 'f'], ['Biela', 'f'], ['Leva', 'f'], ['Válvula', 'f'], ['Palanca', 'f'], ['Chispa', 'f'],
    ['Bobina', 'f'], ['Turbina', 'f'], ['Catarina', 'f'], ['Tuerca', 'f'], ['Prensa', 'f'], ['Hélice', 'f'],
    ['Batería', 'f'], ['Rueda', 'f'], ['Cremallera', 'f'], ['Antena', 'f'], ['Fresa', 'f'], ['Banda', 'f']
  ];
  // [masculino, femenino]
  const ADJ = [
    ['Veloz', 'Veloz'], ['Brillante', 'Brillante'], ['Ágil', 'Ágil'], ['Sereno', 'Serena'], ['Audaz', 'Audaz'],
    ['Curioso', 'Curiosa'], ['Preciso', 'Precisa'], ['Creativo', 'Creativa'], ['Imparable', 'Imparable'],
    ['Valiente', 'Valiente'], ['Firme', 'Firme'], ['Dorado', 'Dorada'], ['Eléctrico', 'Eléctrica'],
    ['Turbo', 'Turbo'], ['Cuántico', 'Cuántica'], ['Constante', 'Constante'], ['Astuto', 'Astuta'],
    ['Genial', 'Genial'], ['Estelar', 'Estelar'], ['Supersónico', 'Supersónica'], ['Ingenioso', 'Ingeniosa'],
    ['Infalible', 'Infalible'], ['Radiante', 'Radiante'], ['Magnético', 'Magnética'], ['Atómico', 'Atómica'],
    ['Legendario', 'Legendaria'], ['Luminoso', 'Luminosa'], ['Invencible', 'Invencible'], ['Épico', 'Épica'],
    ['Digital', 'Digital'], ['Solar', 'Solar'], ['Titanio', 'Titanio'], ['Cósmico', 'Cósmica'], ['Noble', 'Noble']
  ];

  ENG.Apodos = {
    nuevo(usados = []) {
      const set = new Set(usados.map((x) => String(x).toLowerCase()));
      for (let i = 0; i < 200; i++) {
        const [n, g] = ENG.azar(NOMBRES);
        const a = ENG.azar(ADJ)[g === 'f' ? 1 : 0];
        const apodo = `${n} ${a}`;
        if (!set.has(apodo.toLowerCase())) return apodo;
      }
      return `Engrane ${Math.floor(Math.random() * 900 + 100)}`;
    }
  };
})();
