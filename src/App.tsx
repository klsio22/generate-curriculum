import { useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';
import type { CVData } from './types';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';

const defaultValues: CVData = {
  fullName: 'Seu Nome',
  address: 'Seu Endereço',
  phone: '(00) 00000-0000',
  email: 'seu.email@exemplo.com',
  linkedin: 'linkedin.com/in/seu-perfil',
  objective: 'Seu objetivo profissional aqui...',
  education: [
    {
      id: '1',
      course: 'Curso Exemplo',
      institution: 'Universidade Exemplo',
      startDate: '2019',
      endDate: '2023',
    },
  ],
  experience: [
    {
      id: '1',
      role: 'Cargo Exemplo',
      company: 'Empresa Exemplo',
      startDate: '2023',
      endDate: 'Atual',
      description: 'Descrição das atividades realizadas...',
    },
  ],
  skills: 'Habilidade 1\nHabilidade 2\nHabilidade 3',
};

function App() {
  const { register, control } = useForm<CVData>({
    defaultValues,
  });

  // Watch all fields to update preview in real-time
  const data = useWatch({ control }) as CVData;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Gerador de Currículo ABNT
          </h1>
          <button
            onClick={() => reactToPrintFn()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            <Printer size={20} />
            Gerar PDF / Imprimir
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Editor Column */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Editar Informações
            </h2>
            <CVForm
              defaultValues={defaultValues}
              onSubmit={() => {}}
              register={register}
              control={control}
            />
          </div>

          {/* Preview Column */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Visualização
              </h2>
              <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                A4 Preview
              </span>
            </div>

            {/* The wrapper handles the scaling and overflow for the preview on screen */}
            <div className="overflow-auto border rounded bg-gray-300 p-4 flex justify-center shadow-inner max-h-[calc(100vh-200px)]">
              {/* We pass scale to simulate A4 view better if needed, but simple scrolling is fine */}
              <CVPreview ref={contentRef} data={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
