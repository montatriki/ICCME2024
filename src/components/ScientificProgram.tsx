// components/ScientificProgram.js
import { motion } from 'framer-motion';
import Poster from './Poster';

export default function ScientificProgram() {
  const programData = [
    { time: "14h-16h", activity: "Registration from 14:00 to 20:00" },
    { time: "16h30-16h45", activity: "Chair : Pr. Rached Ben Hassen & Pr. Mounir ELACHABY\nOpening Ceremony : ICCME 2024" },
    { time: "16h45-17h20", activity: "Plenary Lecture 1 : \"Cellulosic nanomaterials as coating formulations for slow-release fertilizers with enhanced nutrients use and agronomic efficiencies\"\nPr. Mounir ELACHABY (University Mohammed VI Polytechnic-Morocco)" },
    {
      time: "17h20-18h15",
      activity: "Coffee break\nFirst poster session (P)\nChair: Pr. Mohamed LOUKIL (Tunisia) & Pr. Besma HAMDI (Tunisia)",
      posters: [
        { id: "P1", presenter: "Siwar Soltani (Tunisia-Sfax)", topic: "Bioactive functional films of poly (lactic acid) enhanced with olive leaf extract for food packaging", pdfId: 1 },
        { id: "P2", presenter: "Abderrahmen Jlassi (Tunisia-Sfax)", topic: "Sustainable cellulose aerogel coated with polyaniline for high performance solar steam generation", pdfId: 2 },
        { id: "P3", presenter: "Samar Bouzkri (Tunisia-Sfax)", topic: "Enhancing starch hydrophobicity and functional properties via transesterification with vinyl laurate using ionic liquids and twin-screw extrusion", pdfId: 3 },
        { id: "P4", presenter: "Sahar Jarbout (Tunisia-Sfax)", topic: "Facile preparation of a new Zero-Dimensional Hybrid Bi(III) Halide with Outstanding emission properties", pdfId: 4 },
        { id: "P5", presenter: "Abdellah Mourak (Morocco-Cadi Ayyad)", topic: "Correction to : Assessment of calcium by SEM/EDX in nopal Opuntia megacantha powder", pdfId: 5 },
        { id: "P6", presenter: "Rim Smaoui (Tunisia-Sfax)", topic: "Synthesized of Polythiophene-Grafted Chitin Nanocrystal: Nanocomposites for Electrochemical Sensing of Heavy Metals", pdfId: 6 },
        { id: "P7", presenter: "Rim Smaoui (Tunisia-Sfax)", topic: "Development of a novel colorimetric pH-indicator film based on CMC/flaxseed gum nanocomposite from biobased pectin: A powerful tool to monitor the beef meat freshness", pdfId: 7 },
        { id: "P8", presenter: "Khalida Ghellai (Algeria-M'Hamed Bougara)", topic: "Phenol catalytic oxidation over iron and copper-exchanged pillared bentonite", pdfId: 8 }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-2xl font-semibold mb-6 text-center text-white">November 7th, 2024 (Afternoon)</h4>
        <div className="space-y-6">
          {programData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="border border-white/20 rounded-lg p-4"
            >
              <p className="text-lg font-semibold mb-2 text-pink-400">{item.time}</p>
              <p className="text-sm text-gray-300 whitespace-pre-line mb-4">{item.activity}</p>
              {item.posters && (
                <div className="mt-4 space-y-4">
                  <p className="text-md font-semibold text-white">Poster Presentations:</p>
                  {item.posters.map((poster) => (
                    <Poster key={poster.id} presenter={poster} pdfId={poster.id} />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
