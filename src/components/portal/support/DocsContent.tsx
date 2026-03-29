import {
  LayoutDashboard,
  Zap,
  MessageSquare,
  BarChart3,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  PauseCircle,
  Clock,
  Users,
  Activity,
  TrendingUp,
  Send,
  type LucideIcon,
} from 'lucide-react'

// ─── primitivos reutilizables ────────────────────────────────────────────────

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          background: 'rgba(198,255,0,0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '1px',
        }}
      >
        <Icon size={17} color="#C6FF00" />
      </div>
      <div>
        <h2
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#ffffff',
            margin: '0 0 4px 0',
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  )
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {children}
    </div>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'rgba(255,255,255,0.38)',
        fontWeight: 600,
        margin: '0 0 8px 0',
      }}
    >
      {children}
    </h3>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.65 }}>
      {children}
    </p>
  )
}

function Badge({
  label,
  bg,
  color,
  border,
}: {
  label: string
  bg: string
  color: string
  border?: string
}) {
  return (
    <span
      style={{
        background: bg,
        color,
        border: `1px solid ${border ?? 'transparent'}`,
        fontSize: '0.7rem',
        padding: '2px 10px',
        borderRadius: '99px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function StatusRow({
  icon: Icon,
  iconColor,
  status,
  statusBg,
  statusColor,
  statusBorder,
  description,
}: {
  icon: LucideIcon
  iconColor: string
  status: string
  statusBg: string
  statusColor: string
  statusBorder?: string
  description: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '10px 12px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
      }}
    >
      <Icon size={15} color={iconColor} style={{ marginTop: '2px', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Badge label={status} bg={statusBg} color={statusColor} border={statusBorder} />
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  )
}

function MetricRow({ label, description }: { label: string; description: string }) {
  return (
    <div style={{ display: 'flex', gap: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div
        style={{
          width: '6px',
          height: '6px',
          background: '#C6FF00',
          borderRadius: '50%',
          marginTop: '6px',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#ffffff', marginBottom: '2px' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
          {description}
        </div>
      </div>
    </div>
  )
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(198,255,0,0.05)',
        border: '1px solid rgba(198,255,0,0.15)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '0.8125rem',
        color: 'rgba(198,255,0,0.85)',
        lineHeight: 1.55,
      }}
    >
      💡 {children}
    </div>
  )
}

// ─── contenido principal ─────────────────────────────────────────────────────

export default function DocsContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Intro */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(198,255,0,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(198,255,0,0.12)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0' }}>
          Bienvenido al Portal de SAM-AI
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.65, maxWidth: '600px' }}>
          Este portal te da visibilidad en tiempo real sobre todas las automatizaciones, chatbots y métricas de tu empresa.
          Acá podés monitorear el estado de tus herramientas, revisar el rendimiento mensual y contactar a nuestro equipo cuando lo necesites.
        </p>
      </div>

      {/* Dashboard */}
      <SectionCard>
        <SectionHeader
          icon={LayoutDashboard}
          title="Dashboard"
          description="Vista general del estado de tu cuenta. Es la primera pantalla que ves al iniciar sesión."
        />
        <SectionBody>
          <div>
            <SubTitle>Qué muestra</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <MetricRow
                label="Automatizaciones activas"
                description="Cantidad de flujos de trabajo que están corriendo en este momento."
              />
              <MetricRow
                label="Mensajes este mes"
                description="Total de mensajes procesados por todos tus chatbots en el mes actual."
              />
              <MetricRow
                label="Leads capturados"
                description="Contactos nuevos obtenidos a través de tus chatbots este mes."
              />
              <MetricRow
                label="Horas ahorradas (est.)"
                description="Estimación de tiempo de trabajo manual reemplazado por las automatizaciones este mes."
              />
            </div>
          </div>
          <div>
            <SubTitle>Actividad reciente</SubTitle>
            <Prose>
              Debajo de las métricas encontrás las últimas 5 automatizaciones con su estado actual y cuándo fue la última vez que se ejecutaron. Hacé clic en &ldquo;Ver todas →&rdquo; para ir a la lista completa.
            </Prose>
          </div>
        </SectionBody>
      </SectionCard>

      {/* Automatizaciones */}
      <SectionCard>
        <SectionHeader
          icon={Zap}
          title="Automatizaciones"
          description="Flujos de trabajo automáticos que conectan tus apps y ejecutan tareas sin intervención manual."
        />
        <SectionBody>
          <div>
            <SubTitle>Qué es una automatización</SubTitle>
            <Prose>
              Una automatización es una secuencia de acciones que se ejecuta automáticamente cuando ocurre un evento.
              Por ejemplo: &ldquo;cuando llega un formulario nuevo, crear una tarea en Notion y enviar un email de bienvenida&rdquo;.
              Las plataformas que usamos son <strong style={{ color: 'rgba(255,255,255,0.85)' }}>n8n</strong>, <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Make</strong>, <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Zapier</strong> o integraciones <strong style={{ color: 'rgba(255,255,255,0.85)' }}>custom</strong>.
            </Prose>
          </div>
          <div>
            <SubTitle>Estados posibles</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <StatusRow
                icon={CheckCircle}
                iconColor="#C6FF00"
                status="Activa"
                statusBg="rgba(198,255,0,0.12)"
                statusColor="#C6FF00"
                statusBorder="rgba(198,255,0,0.2)"
                description="La automatización está corriendo normalmente y se ejecuta según lo configurado."
              />
              <StatusRow
                icon={PauseCircle}
                iconColor="rgba(255,255,255,0.4)"
                status="Pausada"
                statusBg="rgba(255,255,255,0.06)"
                statusColor="rgba(255,255,255,0.5)"
                description="La automatización está temporalmente detenida. Puede ser por mantenimiento o configuración."
              />
              <StatusRow
                icon={AlertCircle}
                iconColor="#fca5a5"
                status="Error"
                statusBg="rgba(239,68,68,0.1)"
                statusColor="#fca5a5"
                statusBorder="rgba(239,68,68,0.2)"
                description="La automatización tuvo un fallo en su última ejecución. Nuestro equipo ya fue notificado y está revisando el problema."
              />
            </div>
          </div>
          <div>
            <SubTitle>Columnas de la tabla</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <MetricRow label="Ejecuciones este mes" description="Cantidad de veces que la automatización se ejecutó exitosamente en el mes actual." />
              <MetricRow label="Errores este mes" description="Cantidad de ejecuciones que fallaron. Si es mayor a 0, se muestra en rojo como alerta." />
              <MetricRow label="Última ejecución" description="Cuándo fue la última vez que la automatización corrió, en tiempo relativo (hace 2h, ayer, etc.)." />
            </div>
          </div>
          <TipBox>
            Si ves una automatización en estado Error, no hace falta que hagas nada. Abrí un ticket en Soporte con el nombre de la automatización y nuestro equipo lo revisa.
          </TipBox>
        </SectionBody>
      </SectionCard>

      {/* Chatbots */}
      <SectionCard>
        <SectionHeader
          icon={MessageSquare}
          title="Chatbots"
          description="Asistentes conversacionales que atienden a tus clientes en distintos canales."
        />
        <SectionBody>
          <div>
            <SubTitle>Canales disponibles</SubTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'WhatsApp', desc: 'Atención directa por el número de WhatsApp de tu empresa.' },
                { label: 'Web', desc: 'Widget de chat embebido en tu sitio web.' },
                { label: 'Instagram', desc: 'Respuestas automáticas en mensajes directos de Instagram.' },
                { label: 'Email', desc: 'Procesamiento automático de emails entrantes.' },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 12px' }}
                >
                  <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#ffffff', marginBottom: '3px' }}>{label}</div>
                  <div style={{ fontSize: '0.775rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.45 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubTitle>Estados del chatbot</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <StatusRow
                icon={CheckCircle}
                iconColor="#C6FF00"
                status="Activo"
                statusBg="rgba(198,255,0,0.12)"
                statusColor="#C6FF00"
                statusBorder="rgba(198,255,0,0.2)"
                description="El chatbot está respondiendo mensajes normalmente."
              />
              <StatusRow
                icon={PauseCircle}
                iconColor="rgba(255,255,255,0.4)"
                status="Pausado"
                statusBg="rgba(255,255,255,0.06)"
                statusColor="rgba(255,255,255,0.5)"
                description="El chatbot está temporalmente inactivo."
              />
              <StatusRow
                icon={Activity}
                iconColor="#a5b4fc"
                status="Entrenando"
                statusBg="rgba(99,102,241,0.1)"
                statusColor="#a5b4fc"
                statusBorder="rgba(99,102,241,0.2)"
                description="El chatbot está siendo actualizado con nuevo contenido o configuración. Puede tardar algunas horas."
              />
            </div>
          </div>
          <div>
            <SubTitle>Métricas por chatbot</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <MetricRow label="Mensajes este mes" description="Total de mensajes procesados por este chatbot en el mes en curso." />
              <MetricRow label="Leads capturados" description="Contactos que el chatbot identificó como potenciales clientes y registró sus datos." />
              <MetricRow label="Tiempo de respuesta promedio" description="Promedio de segundos que tarda el chatbot en responder. Valores menores a 3s son considerados excelentes." />
            </div>
          </div>
        </SectionBody>
      </SectionCard>

      {/* Métricas */}
      <SectionCard>
        <SectionHeader
          icon={BarChart3}
          title="Métricas"
          description="Resumen mensual del rendimiento general de tus herramientas."
        />
        <SectionBody>
          <div>
            <SubTitle>Selector de mes</SubTitle>
            <Prose>
              Podés ver los últimos 6 meses usando el selector en la parte superior. Los datos de cada mes son un snapshot del período — no cambian retroactivamente.
            </Prose>
          </div>
          <div>
            <SubTitle>Indicadores disponibles</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <MetricRow
                label="Total de mensajes"
                description="Suma de todos los mensajes procesados por todos tus chatbots durante ese mes."
              />
              <MetricRow
                label="Total de leads"
                description="Suma de todos los contactos capturados por tus chatbots durante ese mes."
              />
              <MetricRow
                label="Ejecuciones de automatizaciones"
                description="Cantidad total de veces que corrieron todas tus automatizaciones ese mes."
              />
              <MetricRow
                label="Horas ahorradas (estimación)"
                description="Cálculo aproximado de horas de trabajo manual reemplazadas. Se calcula en base a la cantidad de ejecuciones y el tiempo promedio de cada tarea automatizada."
              />
            </div>
          </div>
          <TipBox>
            Las métricas se cargan el primer día de cada mes. Si ves &ldquo;Sin datos para este período&rdquo;, es posible que el mes aún no tenga datos cargados o que no haya habido actividad ese mes.
          </TipBox>
        </SectionBody>
      </SectionCard>

      {/* Soporte */}
      <SectionCard>
        <SectionHeader
          icon={HelpCircle}
          title="Soporte"
          description="Sistema de tickets para comunicarte con el equipo de SAM-AI."
        />
        <SectionBody>
          <div>
            <SubTitle>Cómo abrir un ticket</SubTitle>
            <Prose>
              Usá la pestaña <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Consultas</strong> para escribir tu mensaje. Completá el asunto (un título breve) y el mensaje (todos los detalles que ayuden a resolver tu caso). Nuestro equipo responde en un plazo de 24 horas hábiles.
            </Prose>
          </div>
          <div>
            <SubTitle>Estados de los tickets</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <StatusRow
                icon={Send}
                iconColor="#fcd34d"
                status="Abierto"
                statusBg="rgba(245,158,11,0.1)"
                statusColor="#fcd34d"
                statusBorder="rgba(245,158,11,0.2)"
                description="Tu consulta fue recibida y está en cola para ser atendida."
              />
              <StatusRow
                icon={Activity}
                iconColor="#C6FF00"
                status="En progreso"
                statusBg="rgba(198,255,0,0.12)"
                statusColor="#C6FF00"
                statusBorder="rgba(198,255,0,0.2)"
                description="Un miembro del equipo de SAM-AI está trabajando en tu consulta."
              />
              <StatusRow
                icon={CheckCircle}
                iconColor="rgba(255,255,255,0.5)"
                status="Resuelto"
                statusBg="rgba(255,255,255,0.06)"
                statusColor="rgba(255,255,255,0.5)"
                description="La consulta fue cerrada. Si el problema persiste, podés abrir un ticket nuevo."
              />
            </div>
          </div>
          <div>
            <SubTitle>Qué incluir en tu mensaje</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'El nombre de la automatización o chatbot afectado',
                'Qué esperabas que pasara y qué pasó en realidad',
                'Desde cuándo ocurre el problema',
                'Cualquier captura de pantalla o ejemplo concreto',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#C6FF00', fontSize: '0.8rem', marginTop: '2px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.38)', fontWeight: 600 }}>
              Contacto directo
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)' }}>
              También podés escribirnos directamente a{' '}
              <span style={{ color: '#C6FF00' }}>solutionagentmanager.ai@gmail.com</span>
              {' '}para consultas urgentes.
            </div>
          </div>
        </SectionBody>
      </SectionCard>

      {/* Glosario rápido */}
      <SectionCard>
        <SectionHeader
          icon={Users}
          title="Glosario rápido"
          description="Definiciones de los términos más usados en el portal."
        />
        <SectionBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { term: 'Automatización', def: 'Flujo de trabajo que ejecuta tareas automáticamente sin intervención manual.' },
              { term: 'Ejecución', def: 'Una corrida de la automatización. Cada vez que el flujo se activa y completa su ciclo cuenta como una ejecución.' },
              { term: 'Lead', def: 'Contacto nuevo capturado por un chatbot que expresó interés en tus productos o servicios.' },
              { term: 'n8n / Make / Zapier', def: 'Plataformas de automatización que usamos para construir y ejecutar los flujos de trabajo.' },
              { term: 'Horas ahorradas', def: 'Estimación del tiempo que se hubiera tardado en hacer manualmente las tareas que ahora hace la automatización.' },
              { term: 'Tiempo de respuesta', def: 'Segundos que tarda el chatbot desde que recibe un mensaje hasta que responde.' },
            ].map(({ term, def }) => (
              <div
                key={term}
                style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff' }}>{term}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{def}</div>
              </div>
            ))}
          </div>
        </SectionBody>
      </SectionCard>

    </div>
  )
}
