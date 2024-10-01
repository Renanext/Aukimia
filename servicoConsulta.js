document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia'
        },
        events: [
            {
                id: '1',
                title: 'Consulta com Dr. Silverio',
                start: '2024-08-23T12:00:00',
                end: '2024-08-23T13:00:00',
                description: 'Consulta de rotina para o cão de João.',
            },
            {
                id: '2',
                title: 'Consulta com Dra. matheus',
                start: '2024-08-25T10:00:00',
                end: '2024-08-25T11:00:00',
                description: 'Consulta de preventiva para o gato de Maria.',
            },
            {
                id: '3',
                title: 'Consulta com Dr. Renan',
                start: '2024-08-26T11:00:00',
                end: '2024-08-26T12:00:00',
                description: 'Consulta preventiva para o cachorro de Carlos.',
            }
        ],
        eventClick: function(info) {
            alert('ID do evento: ' + info.event.id + '\nTítulo: ' + info.event.title + '\nDescrição: ' + info.event.extendedProps.description);
        }
    });

    calendar.render();
});


