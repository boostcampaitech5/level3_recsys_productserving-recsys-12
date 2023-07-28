import { useContext } from 'react';
import { DiaryContext} from 'src/contexts/diary-context';

export const useDiary = () => useContext(DiaryContext);