package config

import (
	"io"
	"log"
	"os"
)

type Logger struct {
	debug  *log.Logger
	info   *log.Logger
	waring *log.Logger
	err    *log.Logger
	writer io.Writer
}

func NewLogger(p string) *Logger {
	writer := io.Writer(os.Stdout)
	looger := log.New(writer, p, log.Ldate|log.Ltime)

	return &Logger{
		debug:  log.New(writer, "DEBUG: ", looger.Flags()),
		info:   log.New(writer, "INFO: ", looger.Flags()),
		waring: log.New(writer, "WARNING: ", looger.Flags()),
		err:    log.New(writer, "ERROR: ", looger.Flags()),
		writer: writer,
	}
}

func (l *Logger) Debug(v ...interface{}) {
	l.debug.Println(v...)
}

func (l *Logger) Info(v ...interface{}) {
	l.debug.Println(v...)
}
func (l *Logger) Warn(v ...interface{}) {
	l.debug.Println(v...)
}
func (l *Logger) Error(v ...interface{}) {
	l.debug.Println(v...)
}

// create format enabled logs

func (l *Logger) Debugf(format string, v ...interface{}) {
	l.debug.Printf(format, v...)
}
func (l *Logger) Infof(format string, v ...interface{}) {
	l.debug.Printf(format, v...)
}
func (l *Logger) Warnf(format string, v ...interface{}) {
	l.debug.Printf(format, v...)
}
func (l *Logger) Errorf(format string, v ...interface{}) {
	l.debug.Printf(format, v...)
}
