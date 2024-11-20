import { Button, Textarea } from '@nextui-org/react';

const CompanyForm = () => {
  return (
    <form className="flex flex-col gap-6 p-4">
      <Textarea
        className="flex"
        type="text"
        placeholder="Acerca de tu compañia"
        variant="faded"
        description=" Describe en pocas palabras la razón de ser de tu empresa: ¿qué propósito busca cumplir y cómo contribuye al bienestar de tus clientes o la sociedad? Este valor será analizado por nuestra IA para identificar los principios fundamentales que guían tus operaciones y construir una representación precisa de tu negocio."
      />
      <Textarea
        type="text"
        placeholder="Mision"
        variant="faded"
        description="Comparte la aspiración a futuro de tu empresa: ¿qué deseas lograr o en qué quieres convertirte en los próximos años? Nuestra IA procesará esta información para proyectar tus metas estratégicas en un modelo visual."
      />
      <Textarea
        type="text"
        placeholder="Vision"
        variant="faded"
        description="Proporciona una descripción general de tu empresa, incluyendo su historia, productos o servicios clave, y su posición en el mercado. Nuestra IA usará esta información para contextualizar tus objetivos empresariales dentro de tu industria."
      />
      <Textarea
        type="text"
        placeholder="Objetivos"
        variant="faded"
        description="Enumera tus objetivos principales (estratégicos, tácticos u operativos). Indica metas concretas que tu empresa busca alcanzar. Estos datos serán fundamentales para que nuestra IA genere artefactos empresariales personalizados que reflejen tus prioridades organizacionales."
      />
      <div className="flex flex-row justify-end">
        <Button color="primary">Guardar</Button>
      </div>
    </form>
  );
};
export default CompanyForm;
