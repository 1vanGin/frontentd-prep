import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';

import Question from 'components/Question';
import SearchBar from 'components/SearchBar';
import PageHeader from 'components/PageHeader';
import {NothingFound} from 'components/NothingFound';
import {typescriptQuestions} from 'shared/questions/ts_questions';
import {TQuestionItem} from 'shared/types/common';

function TypeScriptPage() {
  const [filteredQuestions, setFilteredQuestions] = useState<TQuestionItem[]>(typescriptQuestions);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = typescriptQuestions.filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredQuestions(filtered);
  };

  return (
    <Box>
      <PageHeader title="Вопросы по TypeScript" />
      <SearchBar onSearch={handleSearch} />
      {filteredQuestions.map(q => (
        <Box key={q.id} id={q.id} mb={2}>
          <Question question={q.question} answer={q.answer} />
        </Box>
      ))}
      {filteredQuestions.length === 0 && <NothingFound />}
    </Box>
  );
}

export default TypeScriptPage;
