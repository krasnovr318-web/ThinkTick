-- ====================================
-- ThinkTick Database Schema
-- Supabase PostgreSQL
-- ====================================

create table users (
id uuid primary key default gen_random_uuid(),

```
username varchar(50) unique not null,

password_hash text not null,

theme varchar(20) default 'light',

primary_color varchar(20) default '#d6c0a8',

created_at timestamptz default now()
```

);

-- ====================================

create table quizzes (
id uuid primary key default gen_random_uuid(),

```
author_id uuid not null references users(id) on delete cascade,

title varchar(255) not null,

description text,

created_at timestamptz default now(),

updated_at timestamptz default now()
```

);

-- ====================================

create table questions (
id uuid primary key default gen_random_uuid(),

```
quiz_id uuid not null references quizzes(id) on delete cascade,

question_text text not null,

position integer not null
```

);

-- ====================================

create table answers (
id uuid primary key default gen_random_uuid(),

```
question_id uuid not null references questions(id) on delete cascade,

answer_text text not null,

is_correct boolean default false
```

);

-- ====================================

create table reactions (
id uuid primary key default gen_random_uuid(),

```
quiz_id uuid not null references quizzes(id) on delete cascade,

user_id uuid not null references users(id) on delete cascade,

reaction_type varchar(20) not null,

created_at timestamptz default now(),

unique(quiz_id, user_id)
```

);

-- ====================================
-- Indexes
-- ====================================

create index idx_quizzes_author
on quizzes(author_id);

create index idx_questions_quiz
on questions(quiz_id);

create index idx_answers_question
on answers(question_id);

create index idx_reactions_quiz
on reactions(quiz_id);

-- ====================================
-- Popularity View
-- ====================================

create view quiz_statistics as
select
q.id,
q.title,

```
count(
    case
        when r.reaction_type = 'good'
        then 1
    end
) as good,

count(
    case
        when r.reaction_type = 'normal'
        then 1
    end
) as normal,

count(
    case
        when r.reaction_type = 'upset'
        then 1
    end
) as upset,

count(
    case
        when r.reaction_type = 'angry'
        then 1
    end
) as angry
```

from quizzes q

left join reactions r
on q.id = r.quiz_id

group by q.id;
