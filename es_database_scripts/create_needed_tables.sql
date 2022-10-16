CREATE TABLE public.es_event (
	es_event_id serial4 NOT NULL,
	event_name varchar(80) NOT NULL,
	event_details varchar(200) NULL,
	create_user_id int4 NULL,
	create_date timestamptz NULL DEFAULT now(),
	modified_date timestamptz NULL,
	window_start date NULL,
	window_end date NULL,
	window_selection_active bool NULL,
	CONSTRAINT es_event_pkey PRIMARY KEY (es_event_id)
);

CREATE TABLE public.es_event_timeslot (
	es_event_timeslot_id serial4 NOT NULL,
	es_event_id int4 NOT NULL,
	create_user_id int4 NULL,
	create_date timestamptz NULL DEFAULT now(),
	timeslot date NULL,
	CONSTRAINT es_event_timeslot_pkey PRIMARY KEY (es_event_timeslot_id)
);

CREATE TABLE public.es_user_timeslot_for_event (
	es_user_timeslot_for_event_id serial4 NOT NULL,
	es_map_event_to_user_id int4 NULL,
	timeslot date NULL,
	create_date timestamptz NULL DEFAULT now(),
	modified_date timestamptz NULL,
	user_name varchar(80) NULL,
	es_event_timeslot_id int4 NULL,
	CONSTRAINT es_user_timeslot_for_event_pkey PRIMARY KEY (es_user_timeslot_for_event_id)
);

ALTER TABLE public.es_event_timeslot ADD CONSTRAINT es_event_timeslots_fk FOREIGN KEY (es_event_id) REFERENCES public.es_event(es_event_id);
ALTER TABLE public.es_user_timeslot_for_event ADD CONSTRAINT es_user_timeslot_for_event_fk FOREIGN KEY (es_event_timeslot_id) REFERENCES public.es_event_timeslot(es_event_timeslot_id);