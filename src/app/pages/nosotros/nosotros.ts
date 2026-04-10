import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-nosotros',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './nosotros.html',
    styleUrl: './nosotros.css',
})
export class NosotrosComponent {
    values = [
        {
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
            title: 'Innovación',
            description: 'Buscamos constantemente nuevas formas de hacer las cosas. No nos conformamos con lo convencional — experimentamos, iteramos y evolucionamos.',
        },
        {
            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
            title: 'Impacto',
            description: 'Cada proyecto debe generar resultados medibles. No hacemos marketing por hacerlo — cada acción tiene un propósito estratégico.',
        },
        {
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
            title: 'Colaboración',
            description: 'Trabajamos como extensión de tu equipo. Tu éxito es nuestro éxito — construimos relaciones a largo plazo basadas en la confianza.',
        },
        {
            icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
            title: 'Compromiso',
            description: 'Nos comprometemos con cada detalle. Desde la estrategia hasta la ejecución, cuidamos cada aspecto para entregar excelencia.',
        },
    ];

    timeline = [
        {
            year: '2021',
            title: 'El inicio',
            description: 'LABMARK nace como un proyecto de dos creativos con una visión clara: hacer marketing diferente.',
        },
        {
            year: '2022',
            title: 'Primeros grandes clientes',
            description: 'Sumamos nuestros primeros 20 clientes y comenzamos a especializarnos en branding y performance.',
        },
        {
            year: '2023',
            title: 'Expansión del equipo',
            description: 'Crecimos a un equipo multidisciplinario de 8 profesionales y lanzamos nuestro servicio de producción audiovisual.',
        },
        {
            year: '2024',
            title: 'Reconocimiento',
            description: 'Superamos los 100 proyectos entregados y nos consolidamos como referentes en marketing digital estratégico.',
        },
        {
            year: '2025',
            title: 'Nuevos horizontes',
            description: 'Ampliamos nuestros servicios con inteligencia artificial aplicada al marketing y estrategia de datos.',
        },
    ];

    team = [
        {
            name: 'Director Creativo',
            role: 'Lidera la visión creativa de cada proyecto, asegurando que cada marca cuente una historia única y memorable.',
            icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
        },
        {
            name: 'Estratega Digital',
            role: 'Define las estrategias de performance y growth que convierten audiencias en clientes reales.',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        },
        {
            name: 'Diseñador UI/UX',
            role: 'Transforma conceptos en interfaces elegantes y funcionales que conectan con el usuario final.',
            icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
        },
        {
            name: 'Content Manager',
            role: 'Crea contenido que inspira, educa y convierte. Desde copy hasta producción audiovisual.',
            icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
        },
    ];

    stats = [
        { value: '+50', label: 'Clientes activos' },
        { value: '+120', label: 'Proyectos entregados' },
        { value: '5', label: 'Años de experiencia' },
        { value: '100%', label: 'Compromiso' },
    ];

    approach = [
        {
            step: '01',
            title: 'Descubrimiento',
            description: 'Analizamos tu marca, tu mercado y tu competencia para entender dónde estás y hacia dónde quieres ir.',
        },
        {
            step: '02',
            title: 'Estrategia',
            description: 'Diseñamos un plan personalizado con objetivos claros, KPIs medibles y un roadmap de ejecución.',
        },
        {
            step: '03',
            title: 'Ejecución',
            description: 'Nuestro equipo implementa cada pieza con precisión — desde el diseño hasta las campañas de performance.',
        },
        {
            step: '04',
            title: 'Optimización',
            description: 'Medimos, iteramos y optimizamos continuamente para maximizar resultados y ROI.',
        },
    ];
}
