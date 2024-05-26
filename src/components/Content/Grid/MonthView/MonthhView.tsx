import styles from './MonthhView.module.scss';

const MonthhView = () => {
    return <div className={styles.root}>
        <div className={styles.weekDays}>
            {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day, index) => (
                <div key={index} className={styles.weekDay}>
                    {day}
                </div>
            ))}
        </div>
    </div>
};

export default MonthhView