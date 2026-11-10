FROM gvenzl/oracle-xe:21-slim

USER root
COPY database/rebuild/00_drop.sql /container-entrypoint-initdb.d/01_drop.sql
COPY database/rebuild/01_tables.sql /container-entrypoint-initdb.d/02_tables.sql
COPY database/rebuild/02_indexes.sql /container-entrypoint-initdb.d/03_indexes.sql
COPY database/rebuild/03_sequences.sql /container-entrypoint-initdb.d/04_sequences.sql
COPY database/rebuild/04_routines.sql /container-entrypoint-initdb.d/05_routines.sql
RUN sed -i 's/\r$//' /container-entrypoint-initdb.d/*.sql
USER oracle
